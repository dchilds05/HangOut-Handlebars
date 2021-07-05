require("dotenv/config");

require("./db");

const express = require("express");
const app = express();
const hbs = require("hbs");
require("./config")(app);


const projectName = "hangout";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();


app.locals.title = `${capitalized(projectName)} created with IronLauncher`;



//ROUTES
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const homeRoutes = require("./routes/home.routes");
app.use("/home", homeRoutes);




require("./error-handling")(app);

module.exports = app;
