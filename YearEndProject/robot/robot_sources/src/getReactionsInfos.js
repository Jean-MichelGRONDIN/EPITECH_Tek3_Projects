module.exports = function getReactionInfos(reactionid, services) {
    for (let index = 0; index < services.length; index++) {
        const elemReactions = services[index].reactions;
        for (let i = 0; i < elemReactions.length; i++) {
            const elem = elemReactions[i];
            if (elem._id == reactionid) {
                return ({servicename: services[index].servicename, serviceid: services[index]._id, reactionid: reactionid, name: elem.name, description: elem.description})
            }
        }
    }
    return (null);
}