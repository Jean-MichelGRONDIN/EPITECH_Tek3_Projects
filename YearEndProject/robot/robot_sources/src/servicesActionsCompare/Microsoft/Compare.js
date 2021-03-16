var getActionInfos = require('../../getActionsInfos');
var getActionData = require('../../getActionData');

async function compareLastEmail(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    try {
        return (tmpactiondata.value[0].changeKey !== iter[1].value[0].changeKey)
    } catch (error) {
        return false
    }
}

async function compareLastPlannerTask(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    try {
        return (tmpactiondata.value[0].id !== iter[1].value[0].id)
    } catch (error) {
        return false
    }
}

async function compareLastOneDriveSharedFile(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    try {
        return (tmpactiondata.id !== iter[1].id)
    } catch (error) {
        return false
    }
}

async function MicrosoftCompare(elem, iter, services) {
    var actionInfos = getActionInfos(iter[0], services);
    switch (actionInfos.name) {
        case "Receive an email":
            var ret = await compareLastEmail(elem, iter, services);
            return (ret);
        case "New task in Planner":
            var ret = await compareLastPlannerTask(elem, iter, services);
            return (ret);
        case "New file shared with me in OneDrive":
            var ret = await compareLastOneDriveSharedFile(elem, iter, services);
            return (ret);
        default:
            return (null);
    }
}

module.exports = MicrosoftCompare;

