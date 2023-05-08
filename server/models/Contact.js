const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose.connection);
const Joi = require("joi");

const ContactSchema = new mongoose.Schema({
  empid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
  },
  phone: {
    type: Number,
    required: [true, "Please add an phone"],
  },
  //we use this to find who has created the contact
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// ContactSchema.plugin(AutoIncrement, {
//   inc_field: "empid",
//   start_seq: 1,
//   prefix: "EM",
//   pad_size: 3,
// });

ContactSchema.pre("save", async function (next) {
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

const Contact = new mongoose.model("Contact", ContactSchema);
// module.exports = mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    address: Joi.string().min(4).max(100).required(),
    email: Joi.string().min(4).max(100).required(),
    phone: Joi.number().min(7).max(100000000000).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};

//ID auto increment in mongoose
//https://www.youtube.com/watch?v=fdu0PXKzMo8
