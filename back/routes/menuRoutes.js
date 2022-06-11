const express = require('express');

const {
	addItem, getAllItems
} = require('./../controllers/menuController');

const router = express.Router();

router.route('/').post(addItem).get(getAllItems);

module.exports = router;
