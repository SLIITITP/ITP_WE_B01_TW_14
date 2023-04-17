const mongoose = require("mongoose");
const Joi = require("joi");

const EmployeeSchema = new mongoose.Schema({
  empid: {
    type: String,
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please add an last name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
  },
  phone: {
    type: Number,
    required: [true, "Please add an contact number"],
  },
  datejoined: {
    type: String,
    required: [true, "Please add an date joined"],
  },
  department: {
    type: String,
    required: [true, "Please add an department"],
  },
  designation: {
    type: String,
    required: [true, "Please add an designation"],
  },
  //we use this to find who has created the employee
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

EmployeeSchema.pre("save", async function (next) {
  try {
    let count = await this.constructor.countDocuments({});
    let id = `EM${(count + 1).toString().padStart(3, "0")}`;
    let duplicate = true;

    // Check if id already exists in the database
    while (duplicate) {
      const existingContact = await this.constructor.findOne({ empid: id });
      if (!existingContact) {
        duplicate = false;
      } else {
        count++;
        id = `EM${(count + 1).toString().padStart(3, "0")}`;
      }
    }

    this.empid = id;
    next();
  } catch (err) {
    next(err);
  }
});

const Employee = new mongoose.model("Employee", EmployeeSchema);

const validateEmployee = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).max(50).required(),
    lastname: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(100).required(),
    phone: Joi.number().min(7).max(100000000000).required(),
    datejoined: Joi.string().min(4).max(100).required(),
    department: Joi.string().min(4).max(100).required(),
    designation: Joi.string().min(4).max(100).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateEmployee,
  Employee,
};
