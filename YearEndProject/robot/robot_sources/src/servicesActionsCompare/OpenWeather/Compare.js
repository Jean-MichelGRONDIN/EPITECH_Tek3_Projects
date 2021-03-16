var getActionInfos = require('../../getActionsInfos');
var getActionData = require('../../getActionData');

async function checkParisNotSunny(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.main !== 'Clear')
}

async function checkParisSunny(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.main === 'Clear')
}

async function MicrosoftCompare(elem, iter, services) {
    var actionInfos = getActionInfos(iter[0], services);
    switch (actionInfos.name) {
        case "When the weather is not clear in Paris":
            var ret = await checkParisNotSunny(elem, iter, services);
            return (ret);
        case "When the weather is clear in Paris":
            var ret = await checkParisSunny(elem, iter, services);
            return (ret);
        default:
            return (null);
    }
}

module.exports = MicrosoftCompare;