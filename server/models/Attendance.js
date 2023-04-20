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
    // required: [true, "Please enter entry time"],
    // required: false,
  },
  offtime: {
    type: String,
    // required: [true, "Please enter off time"],
    // required: false,
  },
  //we use this to find who has added the salary
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// AttendanceSchema.pre("save", function (next) {
//   if (!this.entrytime && !this.offtime) {
//     return next(new Error("Please enter either entry time or off time"));
//   } else {
//     next();
//   }
// });

const Attendance = new mongoose.model("Attendance", AttendanceSchema);

// const validateAttendance = (data) => {
//   const schema = Joi.object({
//     empid: Joi.string().min(5).max(5).required(),
//     date: Joi.string().min(4).max(100).required(),
//     entrytime: Joi.string().min(4).max(100).optional(),
//     offtime: Joi.string().min(4).max(100).optional(),
//   });

//   return schema.validate(data);
// };

module.exports = {
  // validateAttendance,
  Attendance,
};
