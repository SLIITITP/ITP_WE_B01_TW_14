const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        imageUrl: { type: String, required: true },
        sellingprice: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingDetails: {
      companyName: { type: String, required: true },
      customerName: { type: String, required: true },
      shippingAddress: { type: String, required: true },
      city: { type: String, required: true },
      contactNo: { type: String, required: true, min: 10, max: 10 },
      creditDays: { type: Number, required: true },
    },

    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: {
      type: Number,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    acceptedAt: { type: Date },
    deliveredAt: { type: Date },
    rejectedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  try {
    if (!this.orderId) {
      let count = await this.constructor.countDocuments({});

      let id = `SAO${(count + 1).toString().padStart(3, '0')}`;

      let duplicate = true;

      //   Check if id already exists in the database
      while (duplicate) {
        const existingOrder = await this.constructor.findOne({ orderId: id });

        if (!existingOrder) {
          duplicate = false;
        } else {
          count++;

          id = `SAO${(count + 1).toString().padStart(3, '0')}`;
        }
      }

      this.orderId = id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
