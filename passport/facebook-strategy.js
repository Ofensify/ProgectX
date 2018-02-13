const User = require("../models/User");
const passport = require("passport");
const FbStrategy = require("passport-facebook").Strategy;
const fb_app_id = "186990855240174";
const fb_app_secret = "9023559eb148b67960c3b37286e2a861";

passport.use(
  new FbStrategy(
    {
      clientID: fb_app_id,
      clientSecret: fb_app_secret,
      callbackURL: "/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ facebookID: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          facebookID: profile.id,
          username: profile.displayName
        });

        newUser.save(err => {
          if (err) {
            return done(err);
          }
          done(null, newUser);
        });
      });
    }
  )
);
