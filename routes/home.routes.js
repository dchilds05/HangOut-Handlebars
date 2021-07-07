const router = require("express").Router();
const axios = require("axios");

const notLoggedIn = require("../middleware/notLoggedIn");

const seedData = require("../seedData/events.json")

const User = require('./../models/User.model');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const imageUploader = require('./../config/cloudinary')


router.get("/", notLoggedIn, (req, res) => {
  res.render("home/home" , req.session.user);
  });

router.get("/account", notLoggedIn, (req, res) => {
  res.render("home/accountPage", req.session.user);
  });

router.get("/account/edit", notLoggedIn, (req, res) => {
  res.render("home/editAccountDetails", req.session.user);
  });

router.post('/account/edit', imageUploader.single('imageUrl'), (req, res) => {

  const userId = req.session.user._id;

  Object.keys(req.body) // This method returns an array of the object keys
  .forEach(key => (!req.body[key] && req.body[key] !== undefined) && delete req.body[key]);

  req.body.imageUrl = req.file.path;
  
  if(req.body.password) {
    if (req.body.password.length < 8) {
      return res.status(400).render("auth/signup", {
        errorMessage: "Your password needs to be at least 8 characters long.",
      });
    }
    return bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(req.body.password, salt))
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      User.findByIdAndUpdate(userId, req.body)
        .then((updatedUser) => {
          console.log("Updated user: " + updatedUser);
          res.redirect('/auth/logout');
        })
        .catch((error) => {
          console.log(error);
        });
    })
  } 
  else {
    User.findByIdAndUpdate(userId, req.body)
      .then((updatedUser) => {
        console.log("Updated user: " + updatedUser);
        res.redirect('/auth/logout');
      })
      .catch((error) => {
        console.log(error);
      });
  }
});


router.get("/myEvents", notLoggedIn, (req, res) => {
  res.render("home/myOwnEvents", req.session.user);
  });

router.get("/network", notLoggedIn, (req, res) => {
  res.render("home/myNetwork", req.session.user);
  });

router.get("/upcomingEvents", notLoggedIn, (req, res) => {
  res.render("home/myUpcomingEvents", req.session.user);
  });



module.exports = router;