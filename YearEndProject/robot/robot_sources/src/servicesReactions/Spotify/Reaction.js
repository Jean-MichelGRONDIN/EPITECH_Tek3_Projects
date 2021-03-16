const fetch = require("node-fetch");

async function playSong(reactionInfos, userAccount) {
    console.log("Spotify play song, [", Date(), "]");
    await fetch("https://api.spotify.com/v1/me/player/play", {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
                Prefer: "outlook.allow-unsafe-html",
                "outlook.body-content-type": 'text'
            }
    })
    .catch(err => console.log("error", err));
}

async function stopSong(reactionInfos, userAccount) {
    console.log("Spotify pause song, [", Date(), "]");
    await fetch("https://api.spotify.com/v1/me/player/pause", {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
                Prefer: "outlook.allow-unsafe-html",
                "outlook.body-content-type": 'text'
            }
    })
    .catch(err => console.log("error", err));
}

async function nextSong(reactionInfos, userAccount) {
    console.log("Spotify next song, [", Date(), "]");
    await fetch("https://api.spotify.com/v1/me/player/next", {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
                Prefer: "outlook.allow-unsafe-html",
                "outlook.body-content-type": 'text'
            }
    })
    .catch(err => console.log("error", err));
}

async function previousSong(reactionInfos, userAccount) {
    console.log("Spotify previous song, [", Date(), "]");
    await fetch("https://api.spotify.com/v1/me/player/previous", {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + userAccount.accesstoken,
                Accept: "application/json",
                Prefer: "outlook.allow-unsafe-html",
                "outlook.body-content-type": 'text'
            }
    })
    .catch(err => console.log("error", err));
}

async function SpotifySwitch(reactionInfos, userAccount) {
    switch (reactionInfos.name) {
        case "Play a song":
            await playSong(reactionInfos, userAccount);
            console.log("On à reagie sur Spotify et Play a song");
            return (null);
        case "Stop a song":
            await stopSong(reactionInfos, userAccount);
            console.log("On à reagie sur Spotify et Stop a song");
            return (null);
        case "Play next song":
            await nextSong(reactionInfos, userAccount);
            console.log("On à reagie sur Spotify et Play next song");
            return (null);
        case "Play previous song":
            await previousSong(reactionInfos, userAccount);
            console.log("On à reagie sur Spotify et Play previous song");
            return (null);
        default:
            return (null);
    }
}

module.exports = SpotifySwitch;

