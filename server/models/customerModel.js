const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  customerId: {
    type: String,
    unique: true,
  },
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

customerSchema.pre('save', async function (next) {
  try {
    if (!this.customerId) {
      let count = await this.constructor.countDocuments({});

      let id = `CUS${(count + 1).toString().padStart(3, '0')}`;

      let duplicate = true;

      //   Check if id already exists in the database
      while (duplicate) {
        const existingCustomer = await this.constructor.findOne({
          customerId: id,
        });

        if (!existingCustomer) {
          duplicate = false;
        } else {
          count++;

          id = `CUS${(count + 1).toString().padStart(3, '0')}`;
        }
      }

      this.customerId = id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
