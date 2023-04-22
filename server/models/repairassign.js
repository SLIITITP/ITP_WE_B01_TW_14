const mongoose = require('mongoose');

const repairassignSchema = new mongoose.Schema({
    registerNo: {type:String, required: true},
    driver: {type:String, required: true},
    driverMail: {type:String, required: true},
    garage: {type:String, required: true},
    vehicleIssue: {type:String, required: true}
})

const repairassign = mongoose.model("repair-assign", repairassignSchema);

module.exports = repairassign;