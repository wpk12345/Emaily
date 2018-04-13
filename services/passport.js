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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //we already have a record with the given profile ID
        return done(null, existingUser);
      } 
      //don't need to put 'else' here because we put return in line 34
      //if we just had 'done' then we would have to put 'else'
        // we don't have a user record with this ID, make a new record
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);  
      }
    
  )
);
