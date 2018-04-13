const passport = require("passport");

//exporting these route handlers to use in index.js with express
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback", 
  passport.authenticate("google"),
  (req, res) => {
    res.redirect('/surveys');
  }
);

  app.get('/api/logout', (req, res) => {
    //req.logout is a function built in to express
    req.logout();
    res.redirect('/');
  });
  
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
};
