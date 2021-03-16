module.exports = function getActionInfos(actionid, services) {
    for (let index = 0; index < services.length; index++) {
        const elemActions = services[index].actions;
        for (let i = 0; i < elemActions.length; i++) {
            const elem = elemActions[i];
            if (elem._id == actionid) {
                return ({servicename: services[index].servicename, serviceid: services[index]._id, actionid: actionid, name: elem.name, description: elem.description})
            }
        }
    }
    return (null);
}