const mongoose = require("mongoose");

const assignSchema = new mongoose.Schema({
  registerNo: { type: String, required: true },
  driver: { type: String, required: true },
  driverMail: { type: String, required: true },
});

const assign = mongoose.model("driver-vehicle-assign", assignSchema);

module.exports = assign;

//bhanuka
