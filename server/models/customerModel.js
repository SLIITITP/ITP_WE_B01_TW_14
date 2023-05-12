const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  cusName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  cusNIC: {
    type: String,
    default: '',
  },
  district: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  creditLimit: {
    type: Number,
    required: true,
  },
  creditDays: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
