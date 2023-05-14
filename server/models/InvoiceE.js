const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoiceId: {
    type: String,
    // required: [true, "Please enter a valid invoice number"],
    unique: true,
  },

  invoiceNo: {
    type: String,
    required: [true, "Please enter a valid invoice number"],
    unique: true,
  },

  issuedDate: {
    type: String,
    required: [true, "Please enter the issued date"],
  },

  cusName: {
    type: String,
  },

  busiName: {
    type: String,
    required: [true, "Please enter the business name"],
  },

  address: {
    type: String,
    required: false,
  },

  mobileNo: {
    type: String,
    maxlength: 10,
    minlength: 10,
    required: [true, "Please enter a valid mobile number"],
  },

  payMethod: {
    type: String,
    required: [true, "Please select the payment method"],
  },

  bankCode: {
    type: String,
    // required: false,
    default: "N/A",
  },

  bankDate: {
    type: String,
    default: "N/A",
    // required: false,
  },

  cheqNo: {
    type: String,
    // unique: true,
    default: "N/A",
    // required: false,
  },

  paidAmount: {
    type: String,
    required: [true, "Please enter an amount"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

invoiceSchema.pre("save", async function (next) {
  try {
    let count = await this.constructor.countDocuments({});
    let id = `SA${(count + 1).toString().padStart(3, "0")}`;
    let duplicate = true;

    // Check if id already exists in the database
    while (duplicate) {
      const existingContact = await this.constructor.findOne({ invoiceId: id });
      if (!existingContact) {
        duplicate = false;
      } else {
        count++;
        id = `SA${(count + 1).toString().padStart(3, "0")}`;
      }
    }

    this.invoiceId = id;
    next();
  } catch (err) {
    next(err);
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

const validateInvoice = (invoice) => {
  const schema = Joi.object({
    invoiceNo: Joi.string()
      .regex(/^INV[0-9]{3,5}$/) // match pattern INVnnn-nn
      .max(8)
      .min(6)
      .required(),
    issuedDate: Joi.string().min(4).max(15).required(),
    cusName: Joi.string().min(4).max(50).optional(),
    busiName: Joi.string().min(4).max(50).required(),
    address: Joi.string().min(0).max(100).optional(),
    mobileNo: Joi.string()
      // .min(0)
      .length(10)
      .pattern(/^[0-9]+$/),
    payMethod: Joi.string().min(4).max(10).required(),
    bankCode: Joi.string().min(0).max(15).optional(),
    bankDate: Joi.string().min(0).max(15).optional(),
    cheqNo: Joi.string().min(0).max(15).optional(),
    paidAmount: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(invoice);
};

module.exports = {
  validateInvoice,
  Invoice,
};
