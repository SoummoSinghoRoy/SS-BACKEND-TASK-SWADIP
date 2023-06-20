const { body } = require('express-validator');

const User = require('../../model/User');

module.exports = [
  body('username')
      .not().isEmpty().withMessage(`Username can't be empty`)
      .trim()
      .custom(async username => {
        const user = await User.findOne({ username })
        if(user) {
          return Promise.reject("Username already exist")
        }
      })
  ,
  body('email')
      .isEmail().withMessage("Email must be valid")
      .normalizeEmail()
      .custom(async email => {
        const user = await User.findOne({ email })
        if(user) {
          return Promise.reject("Email already exist")
        }
      })
  ,
  body('password')
      .not().isEmpty().withMessage(`Password can't be empty`)
      .isLength({min: 6}).withMessage(`Password length should be between 5 to 10 characters.`)
  ,
  body('confirmPassword')
      .not().isEmpty().withMessage(`Confirm password can't be empty`)
      .custom((confirmPassword, {req}) => {
        if(confirmPassword !== req.body.password) {
          throw new Error(`Password doesn't match`)
        }
        return true
      })
  ,
  body('role')
      .not().isEmpty().withMessage(`Role can't be empty`)
]