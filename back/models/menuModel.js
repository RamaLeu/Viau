const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
        type: String,
    },
    rating:{
        type: String,
    },
    menu:{
        type: String,
    },
    place:{
        type: String,
    },
    placeId:{
        type: String,
    },
    img_url:{
        type:String,
    }

});

const MenuModel = new mongoose.model("items", menuSchema);

module.exports = MenuModel;