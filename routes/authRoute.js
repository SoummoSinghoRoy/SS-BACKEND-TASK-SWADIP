const router = require('express').Router();

const { signupPostController, loginPostController, logoutController } = require('../controller/authController');
const signupValidation = require('../validator/auth/signupValidation');
const loginValidation = require('../validator/auth/loginValidation');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/signup', signupValidation, signupPostController);
router.post('/login', loginValidation, loginPostController);
router.post('/logout', isAuthenticated, logoutController);

module.exports = router;