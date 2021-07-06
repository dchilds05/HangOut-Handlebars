const router = require("express").Router();
const axios = require("axios");

const notLoggedIn = require("../middleware/notLoggedIn");

const seedData = require("../seedData/events.json")


router.get("/", notLoggedIn, (req, res) => {
  let example = seedData._embedded.events[0];
  res.render("home/home" , {eventName: example});
  });

router.get("/account", notLoggedIn, (req, res) => {
  res.render("home/accountPage", req.session.user);
  });

router.get("/account/edit", notLoggedIn, (req, res) => {
  res.render("home/editAccountDetails", req.session.user);
  });

router.get("/myEvents", notLoggedIn, (req, res) => {
  res.render("home/myOwnEvents");
  });

router.get("/network", notLoggedIn, (req, res) => {
  res.render("home/myNetwork");
  });

router.get("/upcomingEvents", notLoggedIn, (req, res) => {
  res.render("home/myUpcomingEvents");
  });



module.exports = router;