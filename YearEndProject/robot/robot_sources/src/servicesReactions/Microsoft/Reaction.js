const fetch = require("node-fetch");
const User = require('../../../models/User');

async function receiveEmail(reactionInfos, userAccount) {
    var ret = [];
    let user = await User.findOne({'accounts.accesstoken': userAccount.accesstoken});

    var ret = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userAccount.accesstoken,
                'Content-type': "application/json",
            },
            body: JSON.stringify({
                message:{
                    subject: "Area reaction receive email",
                    body: {
                        contentType: "Text",
                        content: "An Action happended in Area!"
                    },
                    toRecipients: [
                        {
                            emailAddress: {
                                address: user.email
                            }
                        }
                    ]
                }
            })
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret);
}

async function createOneDriveFolder(reactionInfos, userAccount) {
    var ret = [];

    var ret = await fetch("https://graph.microsoft.com/v1.0/me/drive/root/children", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userAccount.accesstoken,
                'Content-type': "application/json",
            },
            body: JSON.stringify({
                name: "New Folder From Area",
                folder: {}
            })
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret);
}

async function MicrosoftSwitch(reactionInfos, userAccount) {
    switch (reactionInfos.name) {
        case "Receive new email":
            var ret = await receiveEmail(reactionInfos, userAccount);
            return (ret);
        case "Create a new folder in OneDrive":
            var ret = await createOneDriveFolder(reactionInfos, userAccount);
            return (ret);
        default:
            return (null);
    }
}

module.exports = MicrosoftSwitch;

