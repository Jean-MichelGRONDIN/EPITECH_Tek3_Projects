var express = require('express');
var router = express.Router();

var passport = require('passport');

var jwt = require('jsonwebtoken');

var User = require('../models/User');
var Service = require('../models/Service');
// const { route } = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Login route

router.post('/login', async function(req, res, next) {
    // console.log("body:", req.body);
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
    await User.create({   username:         req.body.username,
        firstname:        req.body.firstname,
        lastname:         req.body.lastname,
        email:            req.body.email,
        password:         req.body.password,
        verified:         false,
        accounts:         [],
        actionsreactions: []
    },   function createProduct(err, usr) {
            if(err){
                res.status(200).json({ type: "ko", msg: "Failed to save new user", err });
                return;
            }
            const token = jwt.sign({email: usr.email}, 'your_jwt_secret');
            return res.status(200).json({type: "ok", token: token});
        });
});

// Register route

router.post('/register', async function(req, res, next) {
    if (
        req.body.username === undefined  === undefined ||
        req.body.firstname === undefined ||
        req.body.lastname === undefined ||
        req.body.email === undefined ||
        req.body.password === undefined
    ) {
        res.status(200).json({type: "ko", msg: "Missing mandatory information(s) to create a new user"});
        return;
    }
    if (await User.exists({email: req.body.email}) === true) {
        res.status(200).json({type: "ko", msg: "This email is already linked to an account"});
        return;
    }
    if (await User.exists({username: req.body.username}) === true) {
        res.status(200).json({type: "ko", msg: "This username is already taken"});
        return;
    }
    await User.create({   username:         req.body.username,
                            firstname:        req.body.firstname,
                            lastname:         req.body.lastname,
                            email:            req.body.email,
                            password:         req.body.password,
                            verified:         false,
                            accounts:         [],
                            actionsreactions: []
                        }
    ,   function createProduct(err, usr) {
            if(err || !usr){
                res.status(200).json({ type: "ko", msg: "Failed to save new user", err });
                return;
            }
        });
    res.status(200).json({type: "ok", msg: "New user created"});
});

router.get('/serviceskeys', async function(req, res) {
    let services = await Service.find().select({ _id: 0, servicename: 1, clientid: 1});
    return res.status(200).json(services);
});

router.get('/about.json', async function(req, res, next) {
    let tmpService = await Service.find().select({ _id: 0, servicename: 1, actions: 1, reactions: 1});
    return res.render('aboutjson', { data: JSON.stringify(
        {
            client: {
                host: (req.headers['x-forwarded-for'] || req.socket.remoteAddress)
            },
            server: {
                current_time: ((Date.now() / 1000) | 0),
                services: tmpService
            }
        }, null, 2)});
});

module.exports = router;
