const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");

const ProductSchema = new mongoose.Schema({
    ID: mongoose.ObjectId,
    Name: {
        type: String,
        required: true
    },
    Supplier:{
        type: String
    },
    Description: String,
    Category: String,
    Price:{
        type: Number
    },
    Qty: {
        type: Number
    },
    LowStockFlag: {
        type: Boolean,
        enum: ["true", "false"],
        default: "false"
    },
    isDeleted:{
        type: Boolean,
        enum: ["true", "false"],
        default: "false"
    }
})

module.exports=mongoose.model("Products", ProductSchema);