var getActionInfos = require('../../getActionsInfos');
var getActionData = require('../../getActionData');

async function compareLastAlertNotification(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata !== iter[1])
}

async function compareLastAppointmentNotification(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata !== iter[1])
}

async function compareLastMessageNotification(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata !== iter[1])
}

async function compareLastAbsenceNotification(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata !== iter[1])
}

async function IntraCompare(elem, iter, services) {
    var actionInfos = getActionInfos(iter[0], services);
    switch (actionInfos.name) {
        case "New notification alert":
            var ret = await compareLastAlertNotification(elem, iter, services);
            return (ret);
        case "New notification appointment":
            var ret = await compareLastAppointmentNotification(elem, iter, services);
            return (ret);
        case "New message notification":
            var ret = await compareLastMessageNotification(elem, iter, services);
            return (ret);
        case "New absence notification":
            var ret = await compareLastAbsenceNotification(elem, iter, services);
            return (ret);
        default:
            return (null);
    }
}

module.exports = IntraCompare;

