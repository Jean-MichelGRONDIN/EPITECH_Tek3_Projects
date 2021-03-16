const fetch = require("node-fetch");

const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/';

async function getLastPictureFromCuriosity(userAccount) {
    var ret = [];

    var ret = await fetch(BASE_URL + 'rovers/curiosity/photos?sol=1000&api_key=' + userAccount, {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret.photos[0]);
    return (ret.photos[0]);
}

async function getLastPictureFromOpportunity(userAccount) {
    var ret = [];

    var ret = await fetch(BASE_URL + 'rovers/opportunity/photos?sol=1000&api_key=' + userAccount, {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret.photos[0]);
    return (ret.photos[0]);
}

async function getLastPictureFromSpirit(userAccount) {
    var ret = [];

    var ret = await fetch(BASE_URL + 'rovers/spirit/photos?sol=1000&api_key=' + userAccount, {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret.photos[0]);
    return (ret.photos[0]);
}

async function getLastPictureFromPerseverance(userAccount) {
    var ret = [];

    var ret = await fetch(BASE_URL + 'rovers/perseverance/photos?sol=1000&api_key=' + userAccount, {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    console.log(ret.photos[0]);
    return (ret.photos[0]);
}

async function NasaSwitch(userAccount, actionInfos) {
    switch (actionInfos.name) {
        case "New Mars picture from Curiosity":
            var ret = await getLastPictureFromCuriosity(userAccount);
            return (ret);
        case "New Mars picture from Opportunity":
            var ret = await getLastPictureFromOpportunity(userAccount);
            return (ret);
        case "New Mars picture from Spirit":
            var ret = await getLastPictureFromSpirit(userAccount);
            return (ret);
        case "New Mars picture from Perseverance":
            var ret = await getLastPictureFromPerseverance(userAccount);
            return (ret);
        default:
            return (null);
    }
}

module.exports = NasaSwitch;

