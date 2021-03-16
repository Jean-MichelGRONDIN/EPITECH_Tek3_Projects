const fetch = require("node-fetch");

async function getLastAlertNotification(userAccount) {
    var ret = [];

    var ret = await fetch("https://intra.epitech.eu/" + userAccount.accesstoken + "/user/notification/alert?format=json", {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret[0].title);
    return (ret[0].title);
}

async function getLastAppointmentNotification(userAccount) {
    var ret = [];

    var ret = await fetch("https://intra.epitech.eu/" + userAccount.accesstoken + "/user/notification/coming?format=json", {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret);
    return (ret);
}

async function getLastMessageNotification(userAccount) {
    var ret = [];

    var ret = await fetch("https://intra.epitech.eu/" + userAccount.accesstoken + "/user/notification/message?format=json", {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret[0].id);
    return (ret[0].id);
}

async function getLastAbsenceNotification(userAccount) {
    var ret = [];

    var ret = await fetch("https://intra.epitech.eu/" + userAccount.accesstoken + "/user/notification/missed?format=json", {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret.recents[0]);
    return (ret.recents[0]);
}

async function IntraSwitch(userAccount, actionInfos) {
    switch (actionInfos.name) {
        case "New notification alert":
            var ret = await getLastAlertNotification(userAccount);
            return (ret);
        case "New notification appointment":
            var ret = await getLastAppointmentNotification(userAccount);
            return (ret);
        case "New message notification":
            var ret = await getLastMessageNotification(userAccount);
            return (ret);
        case "New absence notification":
            var ret = await getLastAbsenceNotification(userAccount);
            return (ret);
        default:
            return (null);
    }
}

module.exports = IntraSwitch;

