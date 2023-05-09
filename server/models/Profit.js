const mongoose = require("mongoose");
const Joi = require("joi");

const profitSchema = new mongoose.Schema({
  stockid: {
    type: String,
    required: true,
  },
  costprice: {
    type: Number,
    required: true,
  },
  sellingprice: {
    type: Number,
    required: true,
  },
  quantitysold: {
    type: Number,
    required: true,
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date,
    required: true
  },
  // timeperiod: {
  //   type: String,
  //   required: true,
  // },
  grossprofit: {
    type: Number,
    required: true,
  },
  totalrevenue: {
    type: Number,
    required: true,
  },
  profitmargin: {
    type: Number,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profit = new mongoose.model("Profit", profitSchema);

const validateProfit = (data) => {
  const schema = Joi.object({
    stockid: Joi.string().required(),
    costprice: Joi.number().min(3).max(100000000000).required(),
    sellingprice: Joi.number().min(3).max(100000000000).required(),
    quantitysold: Joi.number().min(1).max(100000000000).required(),
    startdate: Joi.date().required(),
    enddate: Joi.date().required(),
    // timeperiod: Joi.string().required(),
    // grossprofit: Joi.number().min(5).max(100000000000).required(),
    // totalrevenue: Joi.number().min(5).max(100000000000).required(),
    // profitmargin: Joi.number().min(5).max(100000000000).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateProfit,
  Profit,
};
