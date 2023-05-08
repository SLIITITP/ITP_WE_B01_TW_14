const mongoose = require('mongoose');
//const Joi = require("joi");

const vehicleSchema = new mongoose.Schema({
    registerNo: {type:String, required: true},
    brand: {type:String, required: true},
    model: {type:String, required: true},
    vehicleType: {type:String, required: true},
    vehicleColor: {type:String, required: true},
    manufactureYear: {type:String, required: true},
    fuelType: {type:String, required: true},
    vehicleImg: {type:String, required: true},
    vehicleStatus: {type:String, required: true},
    chassisNo: {type:String, required: true},
    LicenceExpiredDate: {type:Date, required: true},
    InsuranceExpiredDate: {type:Date, required: true},
    datecreated:Date,
    dateUpdated:Date
})

const vehicles = mongoose.model("vehicles", vehicleSchema);

// const validateVehicle = (data) => {
//     const schema = Joi.object({
//         registerNo: Joi.string().min(4).max(50).required(),
//         chassisNo: Joi.string().min(4).max(20).required(),
        
//     })

//     return schema.validate(data);
// }

module.exports = vehicles