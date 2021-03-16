const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:    String,
    firstname:   String,
    lastname:    String,
    email:       String,
    password:    String,
    verified:    Boolean,
    accounts:   [{
        sericeid:           String,
        refreshtoken:       String,
        accesstoken:        String,
        accessexpiredate:   String
    }],
    actionsreactions:  [{
        actionid:    String,
        reactionsid: String,
        home: Boolean,
        enable: Boolean
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;