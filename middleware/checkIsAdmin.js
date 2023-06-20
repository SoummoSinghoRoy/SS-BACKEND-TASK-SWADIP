const passport = require('./passport');

const checkIsAdmin = () => (req, res, next) => {
  passport.authenticate('jwt', { session: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: '500 - Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if(user.role === "ADMIN") {
      next()
    }else{
      return res.status(403).json({ 
        Message: 'Forbidden' 
      });
    }
  })(req, res, next)
}

module.exports = checkIsAdmin;