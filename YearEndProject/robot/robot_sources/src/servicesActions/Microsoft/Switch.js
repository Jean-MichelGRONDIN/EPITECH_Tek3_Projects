const fetch = require("node-fetch");

async function getLastEmails(userAccount) {
    var ret = [];

    var ret = await fetch("https://graph.microsoft.com/v1.0/me/mailFolders/Inbox/messages?$top=1", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + userAccount.accesstoken,
        Accept: "application/json",
        Prefer: "outlook.allow-unsafe-html",
        "outlook.body-content-type": 'text'
        }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret);
}

async function getLastPlannerTask(userAccount) {
    var ret = [];

    var ret = await fetch("https://graph.microsoft.com/v1.0/me/planner/tasks?count=1", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
                Prefer: "outlook.allow-unsafe-html",
                "outlook.body-content-type": 'text'
            }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret);
}

async function getLastOneDriveFileShared(userAccount) {
    var ret = [];

    var ret = await fetch("https://graph.microsoft.com/v1.0/me/drive/sharedWithMe?top=1", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
                Prefer: "outlook.allow-unsafe-html",
                "outlook.body-content-type": 'text'
            }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret.value[0]);
}

async function MicrosoftSwitch(userAccount, actionInfos) {
    switch (actionInfos.name) {
        case "Receive an email":
            var ret = await getLastEmails(userAccount);
            return (ret);
        case "New task in Planner":
            var ret = await getLastPlannerTask(userAccount);
            return (ret);
        case "New file shared with me in OneDrive":
            var ret = await getLastOneDriveFileShared(userAccount);
            return (ret);
        default:
            return (null);
    }
}

module.exports = MicrosoftSwitch;

