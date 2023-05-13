const mongoose = require('mongoose');
const nodemailer = require('nodemailer'); //fpaetacctrymcawy - supplier
const cron = require('node-cron');

const purchaseSchema = new mongoose.Schema({
    supid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'suppliers'
    },

    orderid: {
        type: String,
        unique: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    reqdate: {
        type: Date,
        required: true
    },

    completed:{
      type: Boolean,
      default: false,
    },

    items: [
        {
          itemName: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
        }
      ],
});

purchaseSchema.pre("save", async function (next) {
    try {
      let count = await this.constructor.countDocuments({});
      let id = `PO${(count + 1).toString().padStart(3, "0")}`;
      let duplicate = true;
  
      // Check if id already exists in the database
      while (duplicate) {
        const existingContact = await this.constructor.findOne({ orderid: id });
        if (!existingContact) {
          duplicate = false;
        } else {
          count++;
          id = `PO${(count + 1).toString().padStart(3, "0")}`;
        }
      }
  
      this.orderid = id;
      next();
    } catch (err) {
      next(err);
    }
  });


const purchaseOrders = new mongoose.model("purchaseOrders", purchaseSchema);

module.exports = purchaseOrders;