const express = require("express");
const purchaseOrders = require("../models/purchaseSchema");
const router = express.Router();
const auth = require("../middlewares/auth");
const nodemailer = require('nodemailer');


//post API
router.post('/addPurchase', auth, async (req, res) => {
  try {
    const { supid, orderid, items, reqdate, completed } = req.body;
    const newPurchase = new purchaseOrders({ supid, orderid, items, reqdate, completed });
    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/send-report-email', auth, async (req, res) => {
  const { to, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fruwani5@gmail.com',
      pass: 'fpaetacctrymcawy',
    },
  });

  const mailOptions = {
    from: 'fruwani5@gmail.com',
    to,
    subject,
    text: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    res.send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// Define a route to get all new purchaseorder
router.get('/allPurchase', auth, async (req, res) => {
    try {
      const purchases = await purchaseOrders.find().populate('supid', 'supid');
      res.json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

//get only 1 data
  router.get('/purchase/:id', auth, async (req, res) => {
    try {
      const purchase = await purchaseOrders.findById(req.params.id).populate('supid');
      if (!purchase) {
        return res.status(404).json({ msg: 'Purchase order not found' });
      }
      res.json(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  //update a record
  router.put("/editPurchase/:id", auth, async (req, res) => {
    try {
      const { items, reqdate } = req.body;
      const purchase = await purchaseOrders.findById(req.params.id);
      if (!purchase) {
        return res.status(404).send({ message: "Purchase order not found" });
      }
      purchase.items = items;
      purchase.reqdate = reqdate;
      const date1 = new Date(purchase.date).setHours(0, 0, 0, 0);
      const date2 = new Date(purchase.reqdate).setHours(0, 0, 0, 0);
      const remainingDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
      purchase.remainingDays = remainingDays;
      const updatedPurchase = await purchase.save();
      res.status(200).send(updatedPurchase);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  

  //  delete a supplier

  router.delete("/deletePurchase/:id", async (req, res) => {
    try {
        const purchase = await purchaseOrders.findByIdAndDelete(req.params.id);
        if (!purchase) {
        return res.status(404).send({ message: "Purchase order not found" });
        }
        res.status(200).send({ message: "purchase order deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
}
});

//new
router.put('/purchaseOrders/:id',auth, async (req, res) => {
  try {
    const id = req.params.id;
    const purchaseOrder = await purchaseOrders.findByIdAndUpdate(id, { completed: true }, { new: true });
    if (!purchaseOrder) {
      return res.status(404).send({ error: `Purchase order with id ${id} not found` });
    }
    res.send(purchaseOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to mark order as received' });
  }
});

module.exports = router;
