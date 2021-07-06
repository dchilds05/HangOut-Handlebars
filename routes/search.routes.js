const router = require("express").Router();

const mongoose = require("mongoose");

const axios = require('axios');

const seeds = require("../seedData/events.json")

const Event = require("../models/Event.model");

const convert = require("../helperFunctions/convertTmData");

const notLoggedIn = require("../middleware/notLoggedIn");

//CONST THE API HERE

//when search submitted
// query API -> forEach apply convert
// query DB 
// concat both results and render using combined data

router.get("/", notLoggedIn, (req, res) => {
    //const searchParam = req.query.searchParam;
    //let allData = [];



    //query the API using the searchParams that we extracted from the form
    //result will come as object 
    const dataFromApi = seeds._embedded.events;
    let arrayOne = [];
    
    dataFromApi.forEach(event => {
        arrayOne.push(convert(event));
    })
    
    //query our own DB now ( should be in a .then() )
    //collectionName.find( { searchParametersGoHere } )
    /* Event.find({name: searchParam})
    .then(results => {
        allData = arrayOne.concat(results);
    })
    .catch(err => console.log("There is an error: ", err))
    */

    res.render("home")
});

module.exports = router;
/* 
//for a url of:
//localhost:3000?q=how%20are%20you&username=Marco


app.get( "/", (req, res) => {
  
    console.log(req.query);
    
    const q = req.query.q;
    const username = req.query.username;
    
    res.render( "index", {q, username} )
  
  })
  
   */


