var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get passport and localStrategy
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

// get express-session
var session = require("express-session");

// get User model
var User = require('./models/User');

// get jwt strategy and extract
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// Allow cros origin requestes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end()
  next()
});

// Start app on localhost
var port = process.env.API_PORT;

console.log("api_port [", process.env.API_PORT, "]");

if (port === undefined)
  port = 8080;

app.listen(port, function() {
  console.log("[", Date(), '] app started on port: ', port);
});

// Connect to db
mongoose.connect(
  "mongodb+srv://$USER_ID:$USER_MDP@$DB_ADRESSE.mongodb.net/$DB_NAME?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then( () => console.log("[", Date(), "] Db connected") )
  .catch( err => console.log("[", Date(), "] Error connecting to db: ", err) );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

// setup passport/session serialiser and unserialise
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// setup passport localStrategy
passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password !== password) { return done(null, false); }
        return done(null, user);
      });
    }
));

// setup passport jwtStrategy
passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, done) {
      return User.findOne({ email: jwtPayload.email })
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
    }
));

// Routes
app.use('/', indexRouter);
app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
