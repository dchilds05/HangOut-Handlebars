const router = require("express").Router();

const notLoggedIn = require("../middleware/notLoggedIn");



router.get("/", notLoggedIn, (req, res) => {
    res.render("home");
  });



module.exports = router;