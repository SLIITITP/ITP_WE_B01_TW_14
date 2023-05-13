const mongoose = require('mongoose');

const supSchema = new mongoose.Schema({

    supid:{
        type: String,
        unique: true,
    },

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
    },

    mobile: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },

    email:{
        type: String,
        required: true
    },

    company:{
      type: String,
      required: true,
    },

    rate:{
      type: String,
      default: "not rated",
    }
    
});

supSchema.pre("save", async function (next) {
    try {
      let count = await this.constructor.countDocuments({});
      let id = `SUP${(count + 1).toString().padStart(3, "0")}`;
      let duplicate = true;
  
      // Check if id already exists in the database
      while (duplicate) {
        const existingContact = await this.constructor.findOne({ supid: id });
        if (!existingContact) {
          duplicate = false;
        } else {
          count++;
          id = `SUP${(count + 1).toString().padStart(3, "0")}`;
        }
      }
  
      this.supid = id;
      next();
    } catch (err) {
      next(err);
    }
  });

const suppliers = new mongoose.model("suppliers", supSchema);

module.exports = suppliers;