const mongoose = require('mongoose');

const runnigrecordsSchema = new mongoose.Schema({
    registerNo: {type:String, required: true},
    driverName: {type:String, required: true},
    noOfMiles: {type:Number, required: true},
    routeDetails: {type:String, required: true},
    DeliverTime: {type:String, required: true},
    comment: {type:String, required: true},
    deliverdate: Date
})

const runningrecord = mongoose.model("runningrecords", runnigrecordsSchema);

module.exports = runningrecord;