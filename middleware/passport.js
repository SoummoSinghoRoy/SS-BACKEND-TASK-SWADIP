const passport = require('passport');
const config = require('config');

const User = require('../model/User');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("secret");

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await User.findOne({_id: jwt_payload.id})
    if(!user) {
      return done(null, false, { message: 'Incorrect credentials' })
    } 
    return done(null, user)
  } catch (error) {
    done(error)
  }
}));

passport.serializeUser(function(user, done) {
  done(null, { id: user._id, username: user.username, email: user.email, role: user.role });
  console.log('serialized');
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});

module.exports = passport;