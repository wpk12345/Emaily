const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//model class
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      //this tells google that if the callback url goes through any type of proxy, to let it through
      //otherwise we get an error (http/vs https)--see lesson 50 8min through
      proxy: true
    },
    //callback function to create a new instance of User model
    (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile:", profile);

      //query to see if a user already exists
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
