const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    stockid: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    costprice: {
      type: String,
      required: true,
    },
    sellingprice: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
    },
    // brand: {
    //   type: String,
    //   default: 'None',
    // },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    supplier: {
      type: String,
      required: true,
    },
    dateadded: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', async function (next) {
  try {
    if (!this.orderId) {
      let count = await this.constructor.countDocuments({});
      let id = `SP${(count + 1).toString().padStart(3, '0')}`;
      let duplicate = true;

      // Check if id already exists in the database
      while (duplicate) {
        const existingStock = await this.constructor.findOne({ stockid: id });
        if (!existingStock) {
          duplicate = false;
        } else {
          count++;
          id = `SP${(count + 1).toString().padStart(3, '0')}`;
        }
      }

      this.stockid = id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const validateStock = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    // Image: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    costprice: Joi.string().required(),
    sellingprice: Joi.string().required(),
    quantity: Joi.number().required(),
    supplier: Joi.string().required(),
  });

  return schema.validate(data);
};

const Product = mongoose.model('Product', productSchema);
(module.exports = Product), validateStock;
