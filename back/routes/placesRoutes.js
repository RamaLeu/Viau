const express = require('express');

const {
	addPlace, getAllPlaces
} = require('./../controllers/placesController');

const router = express.Router();

router.route('/').post(addPlace).get(getAllPlaces);

module.exports = router;
