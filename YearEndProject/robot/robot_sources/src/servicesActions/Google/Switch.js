const fetch = require("node-fetch");
const Service = require("../../../models/Service");
const User = require('../../../models/User');

async function getLastSubscriptionsVideo(userAccount) {
    var ret = [];

    google = await Service.findOne({servicename: 'Google'});

    var ret = await fetch("https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails%2C%20id&maxResults=1&mine=true&key=" + google.clientid, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
            }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret.items[0]);
}

async function getLastGmailEmail(userAccount) {
    var ret = [];

    let user = await User.findOne({'accounts.accesstoken': userAccount.accesstoken});

    var ret = await fetch("https://gmail.googleapis.com/gmail/v1/users/" + user.email + "/messages?maxResults=1", {
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
            }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret.messages[0]);
}

async function GoogleSwitch(userAccount, actionInfos) {
    switch (actionInfos.name) {
        case "New video in Youtube subscriptions":
            var ret = await getLastSubscriptionsVideo(userAccount);
            return (ret);
        case "Reveice an email in Gmail":
            var ret = await getLastGmailEmail(userAccount);
            return ret;
        default:
            return (null);
    }
}

module.exports = GoogleSwitch;

