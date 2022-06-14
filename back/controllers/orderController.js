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
