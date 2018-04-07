//prod.js - production keys here!!!

//we want to export an object where the values inside that object are being pulled from environment variables in the heroku environment

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:process.env.MONGO_URI,
    cookieKey:process.env.COOKIE_KEY
  };
  
  