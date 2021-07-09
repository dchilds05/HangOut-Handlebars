const router = require("express").Router();
const mongoose = require("mongoose");
const axios = require('axios');


const User = require("../models/User.model");
const Event = require("../models/Event.model")
const convert = require("../helperFunctions/convertTmData");

const apiKey = process.env.APIKEY || "dCkxNrTE0AgGoRUEfzKDYKoSkQOS2Evd";
const imageUploader = require('./../config/cloudinary')

const URI = require("urijs");
const URITemplate = require('urijs/src/URITemplate');

let uriTemplate = new URITemplate(`https://app.ticketmaster.com/discovery/v2/events.json{?q*,apikey}`);



//CREATE EVENT PAGES 


router.get("/create", (req, res) => {
    res.render("eventPages/createEvent")
})




router.post("/create", imageUploader.single('img'), (req, res) => {

    const {name, type, tags, artistSiteUrl, img, description, venueName, city, country, date, time} = req.body;

    let location = {venueName, city, country}
    let dateAndTime = {date, time};

    Event.create({name, type, tags, location, dateAndTime, artistSiteUrl, img: req.file.path, description, owner: req.session.user._id})
    .then(event => {
        Event.findByIdAndUpdate(event._id, { owner: req.session.user})
        .then(event => {
            console.log("the event was created", event)
            res.render("eventPages/event")
        }).catch(err => console.log("error with event owner creation"))
    })
    
    .catch(err => console.log(err))
})



//EVENT CATEGORIES 

router.get("/category/:categoryName" , (req, res) => {
    let userCity = req.session.user.city
    let category = req.params.categoryName

    let eventUri = uriTemplate.expand({
        id: {
            size: "30", 
            classificationName: "music",
            city: userCity,
        },
        apikey: apiKey
    })

    axios.get(eventUri).then(results => {
        let eventFromApi = results.map(result.data._embedded.events);
        return eventFromApi
    }).then(eventFound => {
        res.render("eventPages/event", eventFound)
        console.log("this event is not ours")
    }).catch(err => console.log(err))


})




//SAVE AN EVENT POST ROUTE 
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
            q: {
                id: eventId
            },
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





//EVENT DETAILS GET ROUTE 
router.get("/:id", (req, res) => {
    const eventId = req.params.id

    Event.findById(eventId)
    .then(eventFound => {
        res.render("eventPages/event", eventFound)
        console.log("this event is ours")
    })
    .catch(eventNotFound => {
        let eventUri = uriTemplate.expand({
            q: {
                id: eventId
            },
            apikey: apiKey
        })

        axios.get(eventUri).then(result => {
            let eventFromApi = convert(result.data._embedded.events[0]);
            return eventFromApi
        }).then(eventFound => {
            res.render("eventPages/event", eventFound)
            console.log("this event is not ours")
        }).catch(err => console.log(err))
    })

})





//EVENT PAGES MAIN ROUTE

router.get("/", (req, res) => {
    res.render("eventPages/event")
})


module.exports = router;