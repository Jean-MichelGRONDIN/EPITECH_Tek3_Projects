var getActionInfos = require('../../getActionsInfos');
var getActionData = require('../../getActionData');

async function compareLastPictureFromCuriosity(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.id !== iter[1].id)
}

async function compareLastPictureFromOpportunity(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.id !== iter[1].id)
}

async function compareLastPictureFromSpirit(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.id !== iter[1].id)
}

async function compareLastPictureFromPerseverance(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.id !== iter[1].id)
}

async function MicrosoftCompare(elem, iter, services) {
    var actionInfos = getActionInfos(iter[0], services);
    switch (actionInfos.name) {
        case "New Mars picture from Curiosity":
            var ret = await compareLastPictureFromCuriosity(elem, iter, services);
            return (ret);
        case "New Mars picture from Opportunity":
            var ret = await compareLastPictureFromOpportunity(elem, iter, services);
            return (ret);
        case "New Mars picture from Spirit":
            var ret = await compareLastPictureFromSpirit(elem, iter, services);
            return (ret);
        case "New Mars picture from Perseverance":
            var ret = await compareLastPictureFromPerseverance(elem, iter, services);
            return (ret);
        default:
            return (null);
    }
}

module.exports = MicrosoftCompare;

