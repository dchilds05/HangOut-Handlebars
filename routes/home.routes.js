const router = require("express").Router();
const axios = require("axios");

const notLoggedIn = require("../middleware/notLoggedIn");

const seedData = require("../seedData/events.json")


router.get("/", notLoggedIn, (req, res) => {
  let example = seedData._embedded.events[0];
  res.render("home" , {eventName: example});
  });



module.exports = router;