const mongoose = require('mongoose');
const Joi = require("joi");

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

const validateRunningRecords = (data) => {
    const schema = Joi.object({
        registerNo: Joi.string().min(4).max(50).required(),
        driverName: Joi.string().min(4).max(50).required(),
        noOfMiles: Joi.number().min(10).max(500).required(),
        routeDetails: Joi.string().min(10).max(100).required(),
        DeliverTime: Joi.string().min(1).max(7).required(),
        comment: Joi.string().min(1).max(100).required(),
    })

    return schema.validate(data);
}

module.exports = {
    validateRunningRecords,
    runningrecord
}

//module.exports = runningrecord
