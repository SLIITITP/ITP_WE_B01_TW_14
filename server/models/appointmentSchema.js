const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({

    appid:{
        type: String,
        unique: true,
    },

    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required:true,
    },

    start: {
        type: String,
        required: true
    },

    end: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    }
    
});

appSchema.pre("save", async function (next) {
    try {
      let count = await this.constructor.countDocuments({});
      let id = `APN${(count + 1).toString().padStart(3, "0")}`;
      let duplicate = true;
  
      // Check if id already exists in the database
      while (duplicate) {
        const existingContact = await this.constructor.findOne({ appid: id });
        if (!existingContact) {
          duplicate = false;
        } else {
          count++;
          id = `APN${(count + 1).toString().padStart(3, "0")}`;
        }
      }
  
      this.appid = id;
      next();
    } catch (err) {
      next(err);
    }
  });

const appointments = new mongoose.model("appointments", appSchema);

module.exports = appointments;