var express = require('express');
var router = express.Router();

var User = require('../models/User')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await User.find();
  res.status(200).json(users);
});

router.get('/config', async function(req, res, next) {
  await User.updateOne({email: req.user.email}, {$set: {
    'config.server.current_time': ((Date.now() / 1000) | 0),
    'config.customer.host': (req.headers['x-forwarded-for'] || req.connection.remoteAddress)//req.ip
  }});
  let user = await User.findOne({email: req.user.email});
  res.status(200).json(user.config);
});

router.post('/update', async function(req, res, next) {
  await User.updateOne({email: req.user.email}, {$set: {
    'config.server.current_time': ((Date.now() / 1000) | 0),
    'config.customer.host': req.ip
  }});
  res.status(200).json({type: "ok", msg: "ip and time updated !"});
});

module.exports = router;
