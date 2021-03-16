var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Service = require('../models/Service');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/config', async function(req, res, next) {
    let tmpService = await Service.find().select({ _id: 0, servicename: 1, actions: 1, reactions: 1});
    return res.status(200).json(
        {
            client: {
                host: (req.headers['x-forwarded-for'] || req.socket.remoteAddress)
            },
            server: {
                current_time: ((Date.now() / 1000) | 0),
                services: tmpService
            }
        }
    );
});

// See if my token is correct
router.get('/checktoken', function(req, res, next) {
    res.status(200).json({ type: "ok"});
});

// Link a new third party account to this account
router.post('/linknewaccount', async function(req, res, next) {
    var tmpDate = new Date();

    tmpDate.setMinutes(tmpDate.getMinutes() + 55);
    if (await Service.exists({servicename: req.body.servicename}) === true) {
        let tmpService = await Service.findOne({servicename: req.body.servicename}).select({ _id: 1, servicename: 1});
        await User.updateOne({email: req.user.email}, {$push: {
            'accounts': {
                sericeid:           tmpService._id,
                refreshtoken:       req.body.refreshtoken,
                accesstoken:        req.body.accesstoken,
                accessexpiredate:   tmpDate.toString()
            }
        }}, function(err) {if (err) {console.log(err)}});
        res.status(200).json({ type: "ok"});
    } else {
        res.status(200).json({ type: "ko", msg: "Service's name not found"});
    }
});

// Delete a linked third party account to this account
router.delete('/deletelinkedaccount', async function(req, res, next) {
    if (await Service.exists({servicename: req.body.servicename}) === true) {
        let tmpService = await Service.findOne({servicename: req.body.servicename}).select({ _id: 1, servicename: 1});
        await User.updateOne({email: req.user.email}, {$pull: {
            'accounts': {
                sericeid:      tmpService._id
            }
        }});
        res.status(200).json({ type: "ok"});
    } else {
        return res.status(200).json({ type: "ko", msg: "Service's name not found"});
    }
});

// Get userInfos
router.get('/getUserInfos', async function(req, res, next) {
    let tmpActionsReaction = [];
    var tmptab = req.user.actionsreactions;
    var services = await Service.find();

    for (let index = 0; index < tmptab.length; index++) {
        const tmpActReac = tmptab[index];
        var tmpActServiceName = null;
        var tmpReactServiceName = null;
        var tmpActionRes = null;
        var tmpReactionRes = null;
        for (let iServices = 0; iServices < services.length && (tmpActionRes === null || tmpReactionRes === null); iServices++) {
            const tmpService = services[iServices];
            for (let iAction = 0; iAction < tmpService.actions.length; iAction++) {
                const tmpAction = tmpService.actions[iAction];
                if (tmpAction._id == tmpActReac.actionid) {
                    tmpActServiceName = tmpService.servicename;
                    tmpActionRes = tmpService.actions[iAction];
                }
            }
            for (let iReaction = 0; iReaction < tmpService.reactions.length; iReaction++) {
                const tmpReaction = tmpService.reactions[iReaction];
                if (tmpReaction._id == tmpActReac.reactionsid) {
                    tmpReactServiceName = tmpService.servicename;
                    tmpReactionRes = tmpService.reactions[iReaction];
                }
            }
        }
        tmpActionsReaction.push(
            {
                _id:                    tmpActReac._id,
                actionid:               tmpActReac.actionid,
                reactionsid:            tmpActReac.reactionsid,
                home:                   tmpActReac.home,
                enable:                 tmpActReac.enable,
                actionservice:          tmpActServiceName,
                actionname:             tmpActionRes.name,
                actiondescription:      tmpActionRes.description,
                reactionservice:        tmpReactServiceName,
                reactionname:           tmpReactionRes.name,
                reactiondescription:    tmpReactionRes.description
            }
        );
    }

    let tmpuser = {
        _id:         req.user._id,
        username:    req.user.username,
        firstname:   req.user.firstname,
        lastname:    req.user.lastname,
        email:       req.user.email,
        verified:    req.user.verified,
        accounts:   req.user.accounts,
        actionsreactions:  tmpActionsReaction
    };
    return res.status(200).json(tmpuser);
});

// Get services Actions Reactions
router.get('/servicesActReactList', async function(req, res, next) {
    let tmpService = await Service.find().select({ _id: 1, servicename: 1, actions: 1, reactions: 1});
    return res.status(200).json(tmpService);
});

// Post services Actions Reactions
router.post('/addservicesActReact', async function(req, res, next) {
    await User.updateOne({email: req.user.email}, {$push: {
        'actionsreactions': {
            actionid:         req.body.actionid,
            reactionsid:      req.body.reactionid,
            home:             false,
            enable:           false
        }
    }});
    return res.status(200).json({type: "ok"});
});

// Post services Actions Reactions switch it's enable value
router.post('/switchEnable', async function(req, res, next) {
    await User.updateOne({email: req.user.email, 'actionsreactions._id': req.body.elemid}, {
        $set: {
        "actionsreactions.$.enable":  (req.body.newvalue === "false" ? false : true)
    }});
    return res.status(200).json({type: "ok"});
});

// Post services Actions Reactions switch it's home value
router.post('/switchHome', async function(req, res, next) {
    await User.updateOne({email: req.user.email, 'actionsreactions._id': req.body.elemid}, {
        $set: {
        "actionsreactions.$.home": (req.body.newvalue === "false" ? false : true)
    }});
    return res.status(200).json({type: "ok"});
});

// Post services Actions Reactions deletion
router.post('/deleteActReac', async function(req, res, next) {
    await User.updateOne({email: req.user.email, 'actionsreactions._id': req.body.elemid}, {
        $pull: {
        "actionsreactions": {_id: req.body.elemid }
    }});
    return res.status(200).json({type: "ok"});
});

module.exports = router;
