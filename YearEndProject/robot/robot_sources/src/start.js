var User = require('../models/User');
var Service = require('../models/Service');

var getActionInfos = require('./getActionsInfos');
var getReactionInfos = require('./getReactionsInfos');
var getActionData = require('./getActionData');
var getUserServiceData = require('./getUserServiceData');

function removeDisableActReac(list) {
    var ret = [];

    for (let index = 0; index < list.length; index++) {
        const elem = list[index];
        if (elem.enable === true) {
            ret.push(list[index]);
        }
    }
    return (ret);
}

function getThisUserActData(usersDatas, userid) {
    for (let index = 0; index < usersDatas.length; index++) {
        const element = usersDatas[index];
        if (element[0] == userid) {
            return (usersDatas[index]);
        }
    }
    return (null);
}

async function updateActionData(user, services, previousData) {
    var tmpActReac = user.actionsreactions;
    var tmpMap = new Map();

    for (let index = 0; index < tmpActReac.length; index++) {
        const element = tmpActReac[index];
        if (tmpMap.has(element.actionid) === false) {
            if (previousData !== null && previousData.has(element.actionid) === true) {
                tmpMap.set(element.actionid, previousData.get(element.actionid));
            } else {
                var tmpactiondata = await getActionData(element.actionid, services, user);
                tmpMap.set(element.actionid, tmpactiondata);
            }
        }
    }
    return (tmpMap);
}

async function getActionsFirstData(user, services) {
    var tmpActReac = user.actionsreactions;
    var tmpMap = new Map();

    for (let index = 0; index < tmpActReac.length; index++) {
        const element = tmpActReac[index];
        if (tmpMap.has(element.actionid) === false) {
            var tmpactiondata = await getActionData(element.actionid, services, user);
            tmpMap.set(element.actionid, tmpactiondata);
        }
    }
    return (tmpMap);
}

async function callReactions(actionid, services, element) {
    var tmpUserActReac = element[1].actionsreactions;

    for (let index = 0; index < tmpUserActReac.length; index++) {
        const elem = tmpUserActReac[index];
        if (elem.actionid == actionid) {
            var reactionInfos = getReactionInfos(elem.reactionsid, services);
            var tmpUserAccount = getUserServiceData(reactionInfos.serviceid, element[1]);
            if (reactionInfos !== null && (tmpUserAccount !== null || (reactionInfos.serviceid == "603cd145f7d6f02be369c141" || reactionInfos.serviceid == "603cd1eef7d6f02be369c143"))) {
                var reactionCall = require('./servicesReactions/' + reactionInfos.servicename + '/Reaction');
                await reactionCall(reactionInfos, tmpUserAccount);
            } else {
                console.log("[Reaction] Le user n'as pas de compte lier pour ce service: [", reactionInfos.serviceid, "]");
            }
        }
    }
}

async function Loop(users, services, usersDatas) {
    for (let index = 0; index < usersDatas.length; index++) {
        const elem = usersDatas[index];
        for (const iter of elem[2]) {
            var actionInfos = getActionInfos(iter[0], services);
            var serviceCall = require('./servicesActionsCompare/' + actionInfos.servicename + '/Compare');
            var ret = await serviceCall(elem, iter, services);
            if (ret) {
                await callReactions(iter[0], services, elem);
                var newData = await getActionData(iter[0], services, elem[1]);
                usersDatas[index][2].set(iter[0], newData);
            }
        }
    }
}

// Delete les tokens expiré

async function deleteLinkedAccount(userEmail, serviceId) {
    await User.updateOne({email: userEmail}, {$pull: {
        'accounts': {
            sericeid:      serviceId
        }
    }});
}

async function DisableThisActReac(userEmail, actReacID) {
    await User.updateOne({email: userEmail, 'actionsreactions._id': actReacID}, {
        $set: {
        "actionsreactions.$.enable":  false
    }});
}

async function getServiceIdFromActIdOrReacId(idToFind, services) {
    for (let index = 0; index < services.length; index++) {
        const actions = services[index].actions;
        const reactions = services[index].reactions;
        for (let i_one = 0; i_one < actions.length; i_one++) {
            const actElem = actions[i_one];
            if (idToFind == actElem._id) {
                return (services[index]._id);
            }
        }
        for (let i_one = 0; i_one < reactions.length; i_one++) {
            const ReacElem = reactions[i_one];
            if (idToFind == ReacElem._id) {
                return (services[index]._id);
            }
        }
    }
    return (null);
}

async function DisableAllLinkedActReac(userEmail, serviceId, actReacts, services) {
    for (let index = 0; index < actReacts.length; index++) {
        const elem = actReacts[index];
        var actService = await getServiceIdFromActIdOrReacId(elem.actionid, services);
        var ReacService = await getServiceIdFromActIdOrReacId(elem.reactionsid, services);
        if (serviceId == actService || serviceId == ReacService) {
            await DisableThisActReac(userEmail, elem._id);
        }
    }
}

async function expireChecks(users, services) {
    var currentDate = new Date();
    for (let i_one = 0; i_one < users.length; i_one++) {
        const accounts = users[i_one].accounts;
        for (let i_two = 0; i_two < accounts.length; i_two++) {
            const elem = accounts[i_two];
            var tmpDate = new Date(elem.accessexpiredate);
            if (currentDate > tmpDate) {
                await deleteLinkedAccount(users[i_one].email, elem.sericeid);
                await DisableAllLinkedActReac(users[i_one].email, elem.sericeid, users[i_one].actionsreactions, services);
            }
        }
    }
}

//

async function Start() {
    let users = await User.find();
    let services = await Service.find();
    var usersDatas = [];

    for (let index = 0; index < users.length; index++) {
        users[index].actionsreactions = removeDisableActReac(users[index].actionsreactions);
        const elem = users[index];
        var tmp = await getActionsFirstData(elem, services);
        if (tmp.size !== 0) {
            usersDatas.push([elem._id, elem, tmp]);
        }
    }
    setInterval(async () => {
        await Loop(users, services, usersDatas);
        await expireChecks(users, services);
        users = await User.find();
        services = await Service.find();
        var newusersDatas = [];
        for (let index = 0; index < users.length; index++) {
            users[index].actionsreactions = removeDisableActReac(users[index].actionsreactions);
            const elem = users[index];
            var tmp = await updateActionData(elem, services, getThisUserActData(usersDatas, elem._id)).catch(console.log("Error catch at updateActionData"));
            if (tmp.size !== 0) {
                newusersDatas.push([elem._id, elem, tmp]);
            }
        }
        usersDatas = newusersDatas;
    }, 30000);
}

module.exports = Start;