var getActionInfos = require('./getActionsInfos');
var getUserServiceData = require('./getUserServiceData');

module.exports = async function getActionData(actionid, services, user) {
    var actionInfos = getActionInfos(actionid, services);

    if (actionInfos !== null) {
        var userServiceData = getUserServiceData(actionInfos.serviceid, user);
        if (userServiceData !== null || (actionInfos.serviceid == "603cd145f7d6f02be369c141" || actionInfos.serviceid == "603cd1eef7d6f02be369c143")) {
            var serviceCall = require('./servicesActions/' + actionInfos.servicename + '/Switch');
            var ret = await serviceCall(userServiceData, actionInfos);
            return (ret);
        } else {
            console.log("[Action] Le user n'as pas de compte lier pour ce service: [", actionInfos.serviceid, "]");
        }
    }
    return (null);
}