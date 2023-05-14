const mongoose = require("mongoose");
 
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const Product = new mongoose.model("ProductMo", ProductSchema);

module.exports= Product; 
