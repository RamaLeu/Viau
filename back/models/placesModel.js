const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    adress:{
        type: String,
    },
    rating:{
        type: String,
    },
    imgUrl:{
        type: String,
    }

});

const PlacesModel = new mongoose.model("places", placeSchema);

module.exports = PlacesModel;