const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Event = require("../models/Event.model")

router.get("/create", (req, res) => {
    res.render("eventPages/createEvent")
})

router.post("/create", (req, res) => {

    const {name, type, tags, artistSiteUrl, img, description, venueName, city, country, date, time} = req.body;

    let location = {venueName, city, country}
    let dateAndTime= {date, time}

    Event.create({name, type, tags, location, dateAndTime, artistSiteUrl, img, description})
    .then(event => {
        Event.findByIdAndUpdate(event._id, { owner: req.session.user})
        .then(event => {
            //User.findByIdAndUpdate(req.session.user._id, {
                //createdEvents: createdEvents.push(event)
                console.log(event);
                res.render("eventPages/event")
        })
        .catch(err => console.log("error with event owner creation"))
    })
    .catch(err => console.log(err))
})



router.get("/", (req, res) => {
    res.render("eventPages/event")
})


module.exports = router;