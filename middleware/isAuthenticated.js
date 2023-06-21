const jwt_decode = require('jwt-decode');

const isAuthenticated = (req, res, next) => {
  const token = req.cookies['jwt-token'];
  if(token) {
    const user = jwt_decode(token);
    req.user = user
    next()
  }else {
    res.status(403).json({
      Message: "Unauthorized",
      Authorization: false
    })
  }
}

module.exports = isAuthenticated;