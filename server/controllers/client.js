
const Product = require("../models/productModel.js"); 
const ProductStat = require("../models/ProductStat.js");
const User = require("../models/Userdata"); 
const Users = require("../models/User"); 
const Transaction = require("../models/Transaction.js");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // const productsWithStats = await Promise.all(
    //   products.map(async (product) => {
    //     const stat = await ProductStat.find({
    //       productId: product._id,
    //     });
    //     return {
    //       ...product._doc,
    //       stat,
    //     };
    //   })
    // );

    const productWithCatogory = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stat,
          };
        })
      );

    res.status(200).json(productWithCatogory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCustomers = async (req, res) => {

  try {
    const customers = await Users.find().select("-password");
    res.status(200).json(customers);

  } catch (error) {
    res.status(404).json({ message: error.message });
    
  }
};

const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getProducts, getCustomers, getTransactions };