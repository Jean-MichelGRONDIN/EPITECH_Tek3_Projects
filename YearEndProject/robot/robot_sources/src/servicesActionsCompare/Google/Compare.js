var getActionInfos = require('../../getActionsInfos');
var getActionData = require('../../getActionData');

async function compareLastSubscriptionsVideo(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.etag !== iter[1].etag)
}

async function compareLastGmailEmail(elem, iter, services) {
    var tmpactiondata = await getActionData(iter[0], services, elem[1]);

    return (tmpactiondata.id !== iter[1].id)
}

async function GoogleCompare(elem, iter, services) {
    var actionInfos = getActionInfos(iter[0], services);
    switch (actionInfos.name) {
        case "New video in Youtube subscriptions":
            var ret = await compareLastSubscriptionsVideo(elem, iter, services);
            return (ret);
        case "Reveice an email in Gmail":
            var ret = await compareLastGmailEmail(elem, iter, services);
            return (ret);
        default:
            return (null);
    }
}

module.exports = GoogleCompare;

