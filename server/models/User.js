const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  phoneNumber: String,
  role: {
    type: String,
    required: [true, "role is required"],
  },
});

//Creating a model
const User = new mongoose.model("User", UserSchema);

//In order to use this model in other files, we need to export it
module.exports = User;
