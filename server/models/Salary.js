const mongoose = require("mongoose");
const Joi = require("joi");

const SalarySchema = new mongoose.Schema({
  empid: {
    type: String,
    required: [true, "Please add a employee id"],
  },
  salary: {
    type: Number,
    required: [true, "Please add the basic salary"],
  },
  date: {
    type: String,
    required: [true, "Please add date of salary payment"],
  },
  bonus: {
    type: Number,
    required: [true, "Please add the bonus"],
  },
  //we use this to find who has added the salary
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Salary = new mongoose.model("Salary", SalarySchema);

const validateSalary = (data) => {
  const schema = Joi.object({
    empid: Joi.string().min(5).max(5).required(),
    salary: Joi.number().min(5).max(100000000000).required(),
    date: Joi.string().min(4).max(100).required(),
    bonus: Joi.number().min(5).max(100000000000).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateSalary,
  Salary,
};
