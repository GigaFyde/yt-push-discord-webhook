'use strict'

const {XMLParser} = require("fast-xml-parser");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (event, context) => {
    if (event.method === "GET") {
        if (event.query["hub.challenge"]) {
            return context
                .status(200)
                .succeed(event.query["hub.challenge"])
        } else {
            return context.status(204)
        }
    }
    if (event.method === "POST") {
        if (!event.query["webhook_url"]) {
            return context.status(400)
        }
        const parser = new XMLParser();
        const json = parser.parse(event.body);
        let url = `https://www.youtube.com/watch?v=${json.entry["yt:videoId"]}`
        await fetch(event.query["webhook_url"], {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({
                "content": url,
                "embeds": null,
                "username": "Youtube Push Notification",
                "avatar_url": "https://b2.gigafyde.net/file/gify-file/2023/05/20/youtube-512-289233.png",
                "attachments": []
            })
        })
        return context
            .status(200)
    }
}
