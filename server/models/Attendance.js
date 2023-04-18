const mongoose = require("mongoose");
const Joi = require("joi");

const AttendanceSchema = new mongoose.Schema({
  empid: {
    type: String,
    required: [true, "Please enter a employee id"],
  },
  date: {
    type: String,
    required: [true, "Please enter today's date"],
  },
  entrytime: {
    type: String,
    required: [true, "Please enter entry time"],
  },
  offtime: {
    type: String,
    required: [true, "Please enter off time"],
  },
  //we use this to find who has added the salary
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Attendance = new mongoose.model("Attendance", AttendanceSchema);

const validateAttendance = (data) => {
  const schema = Joi.object({
    empid: Joi.string().min(5).max(5).required(),
    date: Joi.string().min(4).max(100).required(),
    entrytime: Joi.string().min(4).max(100).required(),
    offtime: Joi.string().min(4).max(100).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateAttendance,
  Attendance,
};
