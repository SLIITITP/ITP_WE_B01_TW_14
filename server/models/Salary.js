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
    default: 0, //setting a default value for bonus
    // required: [true, "Please add the bonus"],
  },
  //we use this to find who has added the salary
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalSalary: {
    type: Number,
  },
});

SalarySchema.pre("save", function (next) {
  // add bonus to salary and store in totalSalary field
  this.totalSalary = this.salary + this.bonus;
  next();
});

// Here, we added a new field called "totalSalary" to the SalarySchema. We also set a default value of 0 for the "bonus" field.

// Then, we added a pre hook to the schema that runs before saving a salary document. In this hook, we add the bonus to the salary and store the result in the "totalSalary" field. Finally, we call the next() function to continue with the save operation.

const Salary = new mongoose.model("Salary", SalarySchema);

// const validateSalary = (data) => {
//   const schema = Joi.object({
//     empid: Joi.string().min(5).max(5).required(),
//     salary: Joi.number().min(5).max(100000000000).required(),
//     date: Joi.string().min(4).max(100).required(),
//     bonus: Joi.number().min(5).max(100000000000).optional(),
//   });

//   return schema.validate(data);
// };

module.exports = {
  // validateSalary,
  Salary,
};
