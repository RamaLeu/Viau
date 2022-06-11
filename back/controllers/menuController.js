const MenuModel = require("./../models/menuModel");

exports.addItem = async (req, res) => {
    try {
        const newItem = await MenuModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                item: newItem,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getAllItems = async (req, res) => {
	try {
		const items = await MenuModel.find();
		res.status(200).json({
			status: 'success',
			results: items.length,
			places: items
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};