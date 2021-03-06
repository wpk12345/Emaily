//notice on the server side i am using common js modules.  at present node only has support for common js modules
//on the client side however we will be using the "import (es2015) syntax" as it has support for es2015 modules ..see index.js on client side 
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//not assigning the following 2 to anything so we don't need a variable.  we can just "require" them.
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

//we use the app.use when working with express middleware
//this line tells express to make use of cookies in our application
app.use(
  cookieSession({
    //maxAge is how long till cookie expires.  30 days but in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//here we use call the authroutes file with the app object
//these two files return a function that we exported in authroutes and billing routes, they export a function so  this 'require' statement is going to turn to a
//function which we immediatly call with the express app object
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //Like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  //Express will serve up the index.html file
  //if it doesn't recognize the file
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
