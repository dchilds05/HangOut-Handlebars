const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

const Event = require("../models/Event.model")

router.get("/create", (req, res) => {
    res.render("eventPages/createEvent")
})

router.post("/create", (req, res) => {

    const {name, type, tags, date, location, artistSiteUrl, img, description} = req.body

    Event.create({name, type, tags, location, date, artistSiteUrl, img, description})
    .then(event => {
        console.log(event)
        res.render("eventPages/event")
    })
    .catch(err => console.log(err))

})



router.get("/", (req, res) => {
    res.render("eventPages/event")
})


module.exports = router;