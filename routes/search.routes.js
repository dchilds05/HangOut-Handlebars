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


//when search submitted
// query API -> forEach apply convert
// query DB 
// concat both results and render using combined data


//CREATE URI
let uriTemplate = new URITemplate(`https://app.ticketmaster.com/discovery/v2/{resource}.json{?q*,apikey}`);




router.get("/", notLoggedIn, (req, res) => {
    let resultsArray = [];

    //get the search input:
    const keyword = req.query.keyword;
    const city = req.query.city;
    let date;

    if (req.query.date) {date = req.query.date + "T" + req.query.time + ":00,*"}
    else {date = ""}


    //QUERY THE API:
    //create the URI for the API:
    let searchUri = uriTemplate.expand({
        resource: "events",
        q: {size: "100", keyword, city, localStartDateTime: date},
        apikey: apiKey
      })
        
    console.log("uri: ", searchUri)

    //invoke the API with the created URI, then push each event into an array:
    axios.get(searchUri)
    .then(results => {
        if (results.data._embedded && results.data._embedded.events) {
            let dataFromApi = results.data._embedded.events;
            dataFromApi.forEach(event => {
                resultsArray.push(convert(event));
            })
        }
        else {console.log("no results from API query")}

        
    })
    .catch(err => console.log(err))

    findByValue(keyword)
    
    //query our own DB now ( should be in the .then() from axios)
    //collectionName.find( { searchParametersGoHere } )
    /* Event.find({name: searchParam})
    .then(results => {
        allData = arrayOne.concat(results);
    })
    .catch(err => console.log("There is an error: ", err))
     */

    res.render("home/home")
});

module.exports = router;


