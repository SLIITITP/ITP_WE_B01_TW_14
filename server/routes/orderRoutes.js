const express = require('express');
const Order = require('../models/orderModel');
const { isAuth, isAdmin } = require('../utils.js');
const expressAsyncHandler = require('express-async-handler');
const orderRouter = express.Router();
const User = require('../models/User');
const Product = require('../models/productModel.js');

orderRouter.get(
  '/',
  isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.get(`/`, async (req, res) => {
  const orderList = await Order.find().sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

orderRouter.post('/', isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingDetails: req.body.shippingDetails,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', order });
});

orderRouter.get(
  '/summary',
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'categories', // Replace 'categories' with the actual name of your category collection in the database
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          _id: 0,
          category: '$category.name', // Replace 'name' with the actual field name that contains the category name in your category collection
          count: 1,
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = 'Delivered';
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/accept',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = 'Accepted';
      order.acceptedAt = Date.now();
      await order.save();
      res.send({ message: 'Order Accepted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/reject',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = 'Rejected';
      order.rejectedAt = Date.now();
      await order.save();
      res.send({ message: 'Order Rejected' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

module.exports = orderRouter;
