const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    password: {
        type: String,
    },
    type: {
        type: String,
    },
    salt: {
        type:String
    }


});

const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;