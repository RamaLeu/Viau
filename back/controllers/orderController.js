const OrderModel = require("./../models/orderModel");

exports.addOrder = async (req, res) => {
    try {
        const newOrder = await OrderModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                order: newOrder,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getAllOrders = async (req, res) => {
	try {
		const orders = await OrderModel.find();
		res.status(200).json({
			status: 'success',
			results: orders.length,
			orders: orders
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};

exports.confirmOrder = async (req, res) => {
	try {
		const order = await OrderModel.findByIdAndUpdate(req.body.id, req.body, {
			runValidators: true
		});

		res.status(200).json({
			status: 'success',
			data: {
				order:order
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};