const { body } = require('express-validator');

module.exports = [
  body('email')
      .not().isEmpty().withMessage('Must use valid email')
  ,
  body('password')
      .not().isEmpty().withMessage('Must use valid password')
]