const router = require("express").Router();
const mongoose = require("mongoose");
const axios = require('axios');

const URI = require("urijs");
const URITemplate = require('urijs/src/URITemplate');

const User = require("../models/User.model");
const Event = require("../models/Event.model")
const convert = require("../helperFunctions/convertTmData");

let uriTemplate = new URITemplate(`https://app.ticketmaster.com/discovery/v2/events.json{?id,apikey}`);



const apiKey = process.env.APIKEY || "dCkxNrTE0AgGoRUEfzKDYKoSkQOS2Evd";






router.get("/create", (req, res) => {
    res.render("eventPages/createEvent")
})

router.post("/create", (req, res) => {

    const {name, type, tags, artistSiteUrl, img, description, venueName, city, country, date, time} = req.body;

    let location = {venueName, city, country}
    let dateAndTime = {date, time};

    Event.create({name, type, tags, location, dateAndTime, artistSiteUrl, img, description})
    .then(event => {
        Event.findByIdAndUpdate(event._id, { owner: req.session.user})
        .then(event => {
            console.log("the event was created", event)
            res.render("eventPages/event")
        }).catch(err => console.log("error with event owner creation"))
    })
    .catch(err => console.log(err))

})

router.post("/:id/fav", (req, res) => {
    
    const eventId = req.params.id
    const userId = req.session.user._id

    console.log("user: ", userId, "event: ", eventId)

    Event.findById(eventId)
    .then(eventFound => {
        User.findByIdAndUpdate(userId, {
            $push: {savedEvents: eventFound}
        }).then(user => console.log("user was updated"))
        console.log("this event is ours")
    })
    .catch(eventNotFound => {
        let eventUri = uriTemplate.expand({
            id: eventId,
            apikey: apiKey
        })

        axios.get(eventUri).then(result => {
            let eventFromApi = convert(result.data._embedded.events[0]);
            return eventFromApi
        }).then(eventFromApi => {
            User.findByIdAndUpdate(userId, {
                $push: {savedEvents: eventFromApi}
            }).then(user => console.log("user was updated"))
            console.log("this event: ", eventFromApi, " is not ours")
        })
    })


})

router.get("/", (req, res) => {
    res.render("eventPages/event")
})


module.exports = router;