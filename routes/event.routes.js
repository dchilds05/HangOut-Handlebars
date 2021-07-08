const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Event = require("../models/Event.model")
const imageUploader = require('./../config/cloudinary')

router.get("/create", (req, res) => {
    res.render("eventPages/createEvent")
})

router.post("/create", imageUploader.single('img'), (req, res) => {

    const {name, type, tags, artistSiteUrl, img, description, venueName, city, country, date, time} = req.body;

    let location = {venueName, city, country}
    let dateAndTime= {date, time}

    Event.create({name, type, tags, location, dateAndTime, artistSiteUrl, img: req.file.path, description, owner: req.session.user._id})
    .then(event => {
        User.findByIdAndUpdate(req.session.user._id, {
            $push: { createdEvents: event._id }
        })
        .then(() => res.redirect("/home"))
    })
    
    .catch(err => console.log(err))
})



router.get("/", (req, res) => {
    res.render("eventPages/event")
})


module.exports = router;