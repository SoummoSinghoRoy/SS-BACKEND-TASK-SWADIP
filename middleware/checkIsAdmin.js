const checkIsAdmin = (req, res, next) => {
  if(req.user.role === "ADMIN") {
    next()
  }else{
    return res.status(403).json({ 
      Message: 'Forbidden' 
    });
  }
}

module.exports = checkIsAdmin;