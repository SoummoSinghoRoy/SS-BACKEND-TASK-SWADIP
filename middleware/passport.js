const passport = require('passport');
const config = require('config');

const User = require('../model/User');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromExtractors([
      (req) => req.cookies['jwt-token']
    ])
  ]),
  secretOrKey: config.get("secret")
};

passport.use(new JwtStrategy(jwtOptions, async function(jwt_payload, done) {
  try {
    const user = await User.findOne({_id: jwt_payload.id})
    console.log(user);
    if(!user) {
      return done(null, false, { message: 'Incorrect credentials' })
    } 
    return done(null, user)
  } catch (error) {
    done(error)
  }
}));

module.exports = passport;