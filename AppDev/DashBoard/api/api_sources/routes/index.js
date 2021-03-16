var express = require('express');
var router = express.Router();

var passport = require('passport');

var jwt = require('jsonwebtoken');

var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Login route
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', async function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            return res.status(200).json({
                type: "ko",
                message: info ? info.message : 'Authentication failed',
                user   : user
            });
        }
        const token = jwt.sign({email: user.email}, 'your_jwt_secret');
        return res.status(200).json({type: "ok", token: token});
        })(req, res, next);
});

router.post('/thirdpartyLogin', async function(req, res, next) {
    if (await User.exists({email: req.body.email, password: req.body.password}) === true) {
        console.log("##thirdparty already known");
        const token = jwt.sign({email: req.body.email}, 'your_jwt_secret');
        return res.status(200).json({type: "ok", token: token});
    }
    await User.create({ username: req.body.username, email: req.body.email, password: req.body.password, config: {
        customer: {
            host: (req.headers['x-forwarded-for'] || req.connection.remoteAddress)//req.ip
        },
        server: {
            current_time: ((Date.now() / 1000) | 0),
            services: []
        }
    } }
        , function createProduct(err, usr) {
            console.log("##thirdparty create account");
            if(err){
                res.status(200).json({ type: "ko", msg: "Failed to save new user", err });
                return;
            }
            const token = jwt.sign({email: usr.email}, 'your_jwt_secret');
            return res.status(200).json({type: "ok", token: token});
        });
});

// Register route
router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', async function(req, res, next) {
    if (await User.exists({email: req.body.email}) === true) {
        res.status(200).json({type: "ko", msg: "This email is already linked to an account"});
        return;
    }
    if (await User.exists({username: req.body.username}) === true) {
        res.status(200).json({type: "ko", msg: "This username is already taken"});
        return;
    }
    await User.create({ username: req.body.username, email: req.body.email, password: req.body.password, config: {
        customer: {
            host: (req.headers['x-forwarded-for'] || req.connection.remoteAddress)//req.ip
        },
        server: {
            current_time: ((Date.now() / 1000) | 0),
            services: []
        }
    } }
        , function createProduct(err, usr) {
            if(err){
                res.status(200).json({ type: "ko", msg: "Failed to save new user", err });
                return;
            }
        });
    res.status(200).json({type: "ok", msg: "New user created"});
});

module.exports = router;
