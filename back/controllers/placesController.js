const PlacesModel = require("./../models/placesModel");

exports.addPlace = async (req, res) => {
    try {
        const newPlace = await PlacesModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                place: newPlace,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getAllPlaces = async (req, res) => {
	try {
		const places = await PlacesModel.find();
		res.status(200).json({
			status: 'success',
			results: places.length,
			places: places
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};