const mongoose = require("mongoose");
const Joi = require("joi");

const garageSchema = new mongoose.Schema({
  garageName: { type: String, required: true },
  garageOwner: { type: String, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true },
  ContactNo: { type: String, required: true },
});

const garage = mongoose.model("garage", garageSchema);

const validateGarage = (data) => {
  const schema = Joi.object({
    garageName: Joi.string().min(4).max(50).required(),
    garageOwner: Joi.string().min(4).max(50).required(),
    Address: Joi.string().min(4).max(100).required(),
    Email: Joi.string().email().required(),
    ContactNo: Joi.string().min(7).max(100000000000).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateGarage,
  garage,
};
