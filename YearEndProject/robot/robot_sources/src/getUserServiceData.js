module.exports = function getUserServiceData(tmpServiceId, user) {
    var userAccounts = user.accounts;

    for (let index = 0; index < userAccounts.length; index++) {
        const elem = userAccounts[index];
        if (elem.sericeid == tmpServiceId) {
            return ({ accesstoken: elem.accesstoken, refreshtoken: elem.refreshtoken});
        }
    }
    return (null);
}