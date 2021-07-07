const router = require("express").Router();
const mongoose = require("mongoose");
const axios = require('axios');

const URI = require("urijs");
const URITemplate = require('urijs/src/URITemplate');


const seeds = require("../seedData/events.json")
const Event = require("../models/Event.model");


const convert = require("../helperFunctions/convertTmData");
const notLoggedIn = require("../middleware/notLoggedIn");
const findByValue = require("../helperFunctions/findByValue");


const apiKey = process.env.APIKEY || "dCkxNrTE0AgGoRUEfzKDYKoSkQOS2Evd";


//CREATE URI
let uriTemplate = new URITemplate(`https://app.ticketmaster.com/discovery/v2/{resource}.json{?q*,apikey}`);


//SEARCH API THEN DB THEN CONCAT RESULTS
router.get("/", notLoggedIn, (req, res) => {
    let resultsArray = [];

    //get the search input:
    const keyword = req.query.keyword;
    const citySearched = req.query.city;
    let dateSearched;

    let dateTwo = req.query.date;

    if (req.query.date) {date = req.query.date + "T" + req.query.time + ":00,*"}
    else {dateSearched = ""}


    //QUERY THE API:
    //create the URI for the API:
    let searchUri = uriTemplate.expand({
        resource: "events",
        q: {
            size: "100", 
            keyword, 
            city: citySearched,
            localStartDateTime: dateSearched
        },
        apikey: apiKey
      })
        
    console.log("uri: ", searchUri)

    //invoke the API with the created URI, then push each event into an array:
    axios.get(searchUri)
    .then(results => {
        if (results.data._embedded && results.data._embedded.events) {
            let events = results.data._embedded.events
            let dataFromApi = events.map(convert)
            return dataFromApi;
        }
        else {
            let emptyArr = [];
            console.log("no results from API query")
            return emptyArr
        }

    }).then(resultsFromApi => {
        console.log(" >>>>>>>>> RESULTS API : ", resultsFromApi[0])
        //DB search
        const keywordString = keyword.split(" ").map(el=>`"${el}"`).join(" ");

        Event.find({ 
            $and: [
                {$text: { $search: keywordString }},
                {"location.city": citySearched},
                {"dateAndTime.date": dateTwo}
            ]              
        })
        .then(resultsFromDB => {
            console.log(" >>>>>>>>> RESULTS DB : ", resultsFromDB)
            resultsArray = resultsFromApi.concat(resultsFromDB)
            console.log(" >>>>>>>>> RESULTS ALL : ", resultsArray.length)
        }).catch(err => console.log(err))
        
    })
    .catch(err => console.log(err))


    res.render("home/home")
});


//LEFT TO DO : 
//-SORT RESULTS (BY DATE?)
//array.sort(el, el2 => el.date .localcompare el2.date)
//-CHANGE THE EVENT MODEL (OBJECTS/ARRAYS, HOW TO CREATE DOC WITH IT? AND INDEX?)
//DISPLAY RESULTS


module.exports = router;


