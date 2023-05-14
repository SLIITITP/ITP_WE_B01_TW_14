const express = require('express');
const Customer = require('../models/customerModel');

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  const customers = await Customer.find();

  if (!customers) {
    return res.status(500).json({ success: false });
  }
  res.send(customers);
});

customerRouter.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(500).json({ success: false });
  }
  res.send(customer);
});

customerRouter.post('/', async (req, res) => {
  let customer = new Customer({
    cusName: req.body.cusName,
    companyName: req.body.companyName,
    address: req.body.address,
    contactNo: req.body.contactNo,
    cusNIC: req.body.cusNIC,
    district: req.body.district,
    email: req.body.email,
    creditLimit: req.body.creditLimit,
    creditDays: req.body.creditDays,
  });

  customer = await customer.save();

  if (!customer) return res.status(500).send('The customer cannot be added!');

  res.send(customer);
});

customerRouter.put('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      cusName: req.body.cusName,
      companyName: req.body.companyName,
      address: req.body.address,
      contactNo: req.body.contactNo,
      cusNIC: req.body.cusNIC,
      district: req.body.district,
      email: req.body.email,
      creditLimit: req.body.creditLimit,
      creditDays: req.body.creditDays,
    },
    { new: true }
  );

  if (!customer) return res.status(400).send('The customer cannot be updated');

  res.send(customer);
});

customerRouter.delete('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    await customer.deleteOne();
    res.send({ message: 'Customer Deleted' });
  } else {
    res.status(404).send({ message: 'Customer Not Found!' });
  }
});

module.exports = customerRouter;
