const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../model/User');

exports.signupPostController = async (req, res) => {
  const { username, email, password, role } = req.body;
  const errors = validationResult(req).formatWith(err => err.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }

  try {
    const hashedpassword = await bcrypt.hash(password, 12)
    const registered_user = new User({
      username, email, password: hashedpassword, role
    })
    await registered_user.save()
    res.status(200).json({
      Message: "User created successfully",
      registered_user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.loginPostController = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req).formatWith(err => err.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }

  try {
    const user = await User.findOne({ email })

    if(user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            Message: '500 - Internal server error'
          })
        }
        if (!result) {
          return res.status(404).json({
            Message: "Incorrect password"
          })
        }
        const token = jwt.sign({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }, config.get('secret'), { expiresIn: "12h" })
        res.cookie('jwt-token', token, { httpOnly: true, expires: new Date(Date.now() + 12 * 3600000) });
        res.status(200).json({
          Message: "Successfully logged in",
          Auhtorization: true
        })
      })
    } else {
      return res.status(404).json({
        Message: "User not found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: '500 - Internal server error'
    })
  }
}

exports.logoutController = (req, res) => {
  res.clearCookie('jwt-token', { httpOnly: true })
  res.status(200).json({
    Message: "Successfully logged out",
    Auhtorization: false
  })
}