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
        // To add logic later
        return context
            .status(200)
            .headers({"Content-type": "application/json"})
            .succeed(JSON.stringify({"success": true}))
    }
}
