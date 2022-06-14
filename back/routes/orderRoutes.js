const express = require('express');

const {
	addOrder, getAllOrders, confirmOrder
} = require('./../controllers/orderController');

const router = express.Router();

router.route('/').post(addOrder).get(getAllOrders).patch(confirmOrder);

module.exports = router;
