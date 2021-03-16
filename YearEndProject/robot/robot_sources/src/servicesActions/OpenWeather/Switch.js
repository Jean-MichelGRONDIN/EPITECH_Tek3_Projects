const fetch = require("node-fetch");
const Service = require("../../../models/Service");

const BASE_URL = 'http://api.openweathermap.org/data/2.5/';

async function getWeatherInParis(userAccount) {
    var ret = [];

    service = await Service.findOne({servicename: 'OpenWeather'});

    var ret = await fetch(BASE_URL + 'weather?q=Paris&appid=' + service.clientid, {
            method: 'GET',
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("error", err));
    return (ret.weather[0]);
}

async function OpenWeatherSwitch(userAccount, actionInfos) {
    switch (actionInfos.name) {
        case "When the weather is not clear in Paris":
            var ret = await getWeatherInParis(userAccount);
            return (ret);
        case "When the weather is clear in Paris":
            var ret = await getWeatherInParis(userAccount);
            return (ret);
        default:
            return (null);
    }
}

module.exports = OpenWeatherSwitch;

