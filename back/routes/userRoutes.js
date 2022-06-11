const express = require('express');

const {
	registerUser, loginUser, savedUser
} = require('./../controllers/userController');

const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(loginUser);
router.route('/savedUser').post(savedUser);

module.exports = router;
