var express = require('express');
var router = express.Router();

var Service = require('../models/Service');
const User = require('../models/User');

// Panel admin
router.get('/', function(req, res) {
    res.render('adminHome');
});

// Add a service
router.get('/addservice', function(req, res) {
    res.render('adminAddService');
});

router.post('/addservice', async function(req, res) {
    await Service.create({
        clientid:         req.body.serviceclientid,
        servicename:   req.body.servicename,
        actions:   [],
        reactions:  []
    }, function(err, newservice) {
        if(err || !newservice){
            return res.render('json', { json: { type: "ko", msg: "An error happened", err } });
        }
        return res.render('json', { json: {type: "ok", msg: "service added !"} });
    });
});

// Delete a service
router.get('/delservice', function(req, res) {
    res.render('adminDelService');
});

router.post('/delservice', async function(req, res) {
    await Service.deleteOne({
        servicename:   req.body.servicename,
    }, function(err) {
        if(err){
            return res.render('json', { json: { type: "ko", msg: "An error happened", err } });
        }
        return res.render('json', { json: {type: "ok", msg: "service deleted !"} });
    });
});

// List all services
router.get('/services', async function(req, res) {
    let list = await Service.find();
    res.render('json', { json: list });
});

// List all Users
router.get('/Users', async function(req, res) {
    let list = await User.find();
    res.render('json', { json: list });
});

//Add action to a service
router.get('/addAction', async function(req, res) {
    var tmptab = [];
    let list = await Service.find();
    list.forEach(elem => {
        tmptab.push(elem.servicename);
    });
    res.render('addActReacTemplate', {title: "Add Action", dest: "/admin/addAction", data: tmptab});
});

router.post('/addAction', async function(req, res) {
    await Service.updateOne({servicename: req.body.servicename}, {$push: {
        'actions': {
            name: req.body.newname,
            description: req.body.newdescription
        }
    }}).then(err => {
        if(err){
            return res.render('json', { json: { type: "ko", msg: "An error happened", err } });
        }
        return res.render('json', { json: {type: "ok", msg: "action added !"} });
    });
});

//Add reaction to a service
router.get('/addReaction', async function(req, res) {
    var tmptab = [];
    let list = await Service.find();
    list.forEach(elem => {
        tmptab.push(elem.servicename);
    });
    res.render('addActReacTemplate', {title: "Add Reaction", dest: "/admin/addReaction", data: tmptab});
});

router.post('/addReaction', async function(req, res) {
    await Service.updateOne({servicename: req.body.servicename}, {$push: {
        'reactions': {
            name: req.body.newname,
            description: req.body.newdescription
        }
    }}).then(err => {
        if(err){
            return res.render('json', { json: { type: "ko", msg: "An error happened", err } });
        }
        return res.render('json', { json: {type: "ok", msg: "reaction added !"} });
    });
});

//Purge a user linked accounts
router.get('/rmLinkedAccounts', async function(req, res) {
    var tmptab = [];
    let list = await User.find();
    list.forEach(elem => {
        tmptab.push(elem.username);
    });
    res.render('purgeUserTabTemplate', {title: "Purge Linked Accounts List", dest: "/admin/rmLinkedAccounts", data: tmptab});
});

router.post('/rmLinkedAccounts', async function(req, res) {
    await User.updateOne({username: req.body.username}, {$set: {
        accounts: []
    }}).then(err => {
        if(err){
            return res.render('json', { json: { type: "ko", msg: "An error happened", err } });
        }
        return res.render('json', { json: {type: "ok", msg: "Linked accounts purged !"} });
    });
});

//Purge a user linked accounts
router.get('/rmActionsReactions', async function(req, res) {
    var tmptab = [];
    let list = await User.find();
    list.forEach(elem => {
        tmptab.push(elem.username);
    });
    res.render('purgeUserTabTemplate', {title: "Purge Linked Accounts List", dest: "/admin/rmActionsReactions", data: tmptab});
});

router.post('/rmActionsReactions', async function(req, res) {
    await User.updateOne({username: req.body.username}, {$set: {
        actionsreactions: []
    }}).then(err => {
        if(err){
            return res.render('json', { json: { type: "ko", msg: "An error happened", err } });
        }
        return res.render('json', { json: {type: "ok", msg: "Actions Reaction list Purged !"} });
    });
});

module.exports = router;