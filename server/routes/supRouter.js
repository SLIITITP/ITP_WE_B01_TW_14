const express = require("express");
const Suppliers = require("../models/supSchema");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/addSupplier", auth, async (req, res) => {
  const { name, address, mobile, email, company } = req.body;

  if (!name || !address || !mobile || !email || !company) {
    return res.status(400).json("Please fill in all required fields");
  }

  try {
    const presup = await Suppliers.findOne({ mobile: mobile });

    if (presup) {
      return res.status(400).json("This supplier already exists");
    }

    const newSupplier = new Suppliers({
      name,
      address,
      mobile,
      email,
      company,
    });

    await newSupplier.save();
    res.status(200).send("Supplier added successfully");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json(
        "An error occurred while processing your request. Please try again."
      );
  }
});

// Define a route to get all newSuppliers
router.get("/allSupplier", auth, (req, res) => {
  Suppliers.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//get only 1 data
router.get("/supplier/:id", auth, (req, res) => {
  Suppliers.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put("/editSupplier/:id", auth, async (req, res) => {
  try {
    const { name, address, mobile, email, company } = req.body;
    const newSupplier = await Suppliers.findOneAndUpdate(
      { _id: req.params.id },
      { name, address, mobile, email, company },
      { new: true }
    );

    if (!newSupplier) {
      return res.status(404).send({ message: "Supplier not found" });
    }

    res.status(200).send(newSupplier);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message:
          "An error occurred while processing your request. Please try again.",
      });
  }
});

//  delete a supplier
router.delete("/deleteSupplier/:id", async (req, res) => {
  try {
    const supplier = await Suppliers.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).send({ message: "supplier not found" });
    }

    res.status(200).send({ message: "supplier deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//new
router.put("/updateSupplierRate/:id", auth, async (req, res) => {
  const { rate } = req.body;

  try {
    const supplier = await Suppliers.findByIdAndUpdate(
      req.params.id,
      { rate },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).send({ message: "Supplier not found" });
    }

    res.status(200).send(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
});


module.exports = router;
