const express = require('express');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const expressAsyncHandler = require('express-async-handler');

const productRouter = express.Router();

productRouter.get(`/`, async (req, res) => {
  const stockList = await Product.find();

  if (!stockList) {
    return res.status(500).json({ success: false });
  }
  res.send(stockList);
});

const PAGE_SIZE = 9;
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            sellingprice: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { sellingprice: 1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : order === 'highest'
        ? { sellingprice: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get('/name/:name', async (req, res) => {
  const product = await Product.findOne({ name: req.params.name });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.status(200).send(product);
  } else {
    return res.status(404).json({ message: 'The product not found' });
  }
});

productRouter.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category');

  let product = new Product({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
    description: req.body.description,
    costprice: req.body.costprice,
    sellingprice: req.body.sellingprice,
    countInStock: req.body.countInStock,
    isFeatured: req.body.isFeatured,
    supplier: req.body.supplier,
  });

  product = await product.save();

  if (!product) return res.status(500).send('the stock cannot be created!');

  res.send(product);
});

productRouter.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      description: req.body.description,
      costprice: req.body.costprice,
      sellingprice: req.body.sellingprice,
      countInStock: req.body.countInStock,
      brand: req.body.brand,
      isFeatured: req.body.isFeatured,
      supplier: req.body.supplier,
    },
    { new: true }
  );

  if (!product) return res.status(400).send('The product cannot be updated');

  res.send(product);
});

productRouter.delete('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.send({ message: 'Product Deleted' });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

module.exports = productRouter;
