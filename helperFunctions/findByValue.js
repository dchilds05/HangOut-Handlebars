//arrayFromDB = [{event1} , {event2}, etc]
//searchParams = keyword, city, date
 /*
const mongoose = require("mongoose");
const Event = require("../models/Event.model");

Event.createIndexes({
    name: "text",
	description: "text",
	type: "text",
	tags: "text",
	venueName: "text",
    city: "text",
    country: "text",
})


function findByValue (keyword) {
    Event.find({ $text: { $search: keyword } })
    .then(results => console.log("results: ", results)
    .catch(err => console.log("error querying the DB: " , err)))
}
 
 */


/* 
function findByValue (arrayFromDB, searchParams) {
    arrayFromDB.forEach(event => {

    })
}
 */

//module.exports = findByValue;