const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    surname:{
        type: String,
    },
    number:{
        type: Number,
    },
    items:{
        type: Array,
    },
    adress:{
        type: String,
    },
    total:{
        type: Number
    }


});

const OrderModel = new mongoose.model("orders", orderSchema);

module.exports = OrderModel;