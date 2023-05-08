const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
    registerNo: {type:String, required: true},
    fuelType: {type:String, required: true},
    capacity: {type:Number, required: true},
    Amount: {type:Number, required: true},
    fillingStation: {type:String, required: true},
    fueldate: {type:Date, required: true},
})

const fuel = mongoose.model("fuel", fuelSchema);

module.exports = fuel;