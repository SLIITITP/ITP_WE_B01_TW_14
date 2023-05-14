const router = require("express").Router();
const mongoose = require("mongoose");

const { validateInvoice, Invoice } = require("../models/InvoiceE");
const auth = require("../middlewares/auth");

//create employee
router.post("/addInv", auth, async (req, res) => {
  const {
    invoiceNo,
    issuedDate,
    cusName,
    busiName,
    address,
    mobileNo,
    payMethod,
    bankCode,
    bankDate,
    cheqNo,
    paidAmount,
  } = req.body;

  const { error } = validateInvoice(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newInvoice = new Invoice({
      invoiceNo,
      issuedDate,
      cusName,
      busiName,
      address,
      mobileNo,
      payMethod,
      bankCode,
      bankDate,
      cheqNo,
      paidAmount,
      postedBy: req.user._id,
    });
    //save the invoice details
    const result = await newInvoice.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// fetch contacts
router.get("/allInv", auth, async (req, res) => {
  //   Invoice.find()
  //     .then((invoices) => {
  //       res.json(invoices);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  try {
    const invoice = await Invoice.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ invoice: invoice });
    // return res.status(200).json({ employee: employee.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update employee
router.put("/updateInv", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const invoice = await Invoice.findOne({ _id: id });

    if (req.user._id.toString() !== invoice.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't update this invoice" });
    }
    const updatedData = { ...req.body, id: undefined };
    // const result = await Employee.updateOne({ _id: id }, updatedData);
    const result = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated contact and send it back to the client
    const updateInvoice = await Invoice.findById(id);
    return res.status(200).json(updateInvoice);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// delete employee
router.delete("/deleteInv/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const invoice = await Invoice.findOne({ _id: id });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    if (req.user._id.toString() !== invoice.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't delete this Invoice" });
    }
    const result = await Invoice.deleteOne({ _id: id });
    const invoices = await Invoice.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ invoices: invoices });
    // return res.status(200).json({ employees: employees.reverse() });
  } catch (error) {
    console.log(error);
  }
});

//to get a single contact
router.get("/searchInv/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const invoice = await Invoice.findOne({ _id: id });

    return res.status(200).json({ ...invoice._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
