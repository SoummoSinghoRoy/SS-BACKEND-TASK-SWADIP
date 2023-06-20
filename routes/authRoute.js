const router = require('express').Router();

const { signupPostController, loginPostController } = require('../controller/authController');
const signupValidation = require('../validator/auth/signupValidation');
const loginValidation = require('../validator/auth/loginValidation');

router.post('/signup', signupValidation, signupPostController)
router.post('/login', loginValidation, loginPostController)

module.exports = router;