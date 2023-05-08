const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
    registerNo: {type:String, required: true},
    addedDriver: {type:String, required: true},
    garage: {type:String, required: true},
    Amount: {type:Number, required: true},
    invoiceImg: {type:String, required: true},
    comment: {type:String, required: true},
    dateadded:Date
})

const vehiclerepair = mongoose.model("vehiclerepair", repairSchema);

module.exports = vehiclerepair;