var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require("dotenv").config()
let passport = require("passport")

passport.use(new GoogleStrategy({
    clientID:  process.env.clientID    ,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:400/user/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    console.log(profile._json)

    return done(null,profile._json)

  }
));



module.exports = passport