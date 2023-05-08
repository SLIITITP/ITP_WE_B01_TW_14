const router = require("express").Router();
const mongoose = require("mongoose");
const { Category } = require("../models/Category");
const { validateStock, Stock } = require("../models/Stock");
const auth = require("../middlewares/auth");

router.post("/stock", auth, async (req, res) => {
  const {
    name,
    //image,
    category,
    description,
    costprice,
    sellingprice,
    quantity,
    supplier,
  } = req.body;

  const { error } = validateStock(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newStock = new Stock({
      name,
      //image,
      category,
      description,
      costprice,
      sellingprice,
      quantity,
      supplier,
      postedBy: req.user._id,
    });
    //save the user
    const result = await newStock.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// router.post("/stock", auth, async (req, res) => {
//   const {
//     name,
//     //image,
//     category,
//     description,
//     costprice,
//     sellingprice,
//     quantity,
//     supplier,
//   } = req.body;

//   const { error } = validateStock(req.body);

//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   try {
//     let categoryId;
//     if (category) {
//       // Check if the category already exists
//       const existingCategory = await Category.findOne({ name: category });

//       if (existingCategory) {
//         categoryId = existingCategory.name;
//       } else {
//         // Create a new category if it doesn't exist
//         const newCategory = new Category({ name: category });
//         const savedCategory = await newCategory.save();
//         categoryId = savedCategory.name;
//       }
//     }

//     const newStock = new Stock({
//       name,
//       //image,
//       category: categoryId,
//       description,
//       costprice,
//       sellingprice,
//       quantity,
//       supplier,
//       postedBy: req.user._id,
//     });

//     //save the stock
//     const result = await newStock.save();

//     //201 means success
//     //._doc defines name, address, email and phone
//     return res.status(201).json({ ...result._doc, category: categoryId });

//   } catch (err) {
//     console.log(err);
//   }
// });

//fetch contacts
router.get("/mystocks", auth, async (req, res) => {
  try {
    const stock = await Stock.find().populate("postedBy", "-password");

    return res.status(200).json({ stock: stock });
    // return res.status(200).json({ employee: employee.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update employee
router.put("/stock", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const stock = await Stock.findOne({ _id: id });

    if (req.user._id.toString() !== stock.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't update this stock" });
    }
    const updatedData = { ...req.body, id: undefined };
    // const result = await Employee.updateOne({ _id: id }, updatedData);
    const result = await Stock.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated contact and send it back to the client
    const updatedStock = await Stock.findById(id);
    return res.status(200).json(updatedStock);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//delete employee
router.delete("/deletestock/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const stock = await Stock.findOne({ _id: id });
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    if (req.user._id.toString() !== stock.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't delete this stock" });
    }
    const result = await Stock.deleteOne({ _id: id });
    const stocks = await Stock.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ stocks: stocks });
    // return res.status(200).json({ employees: employees.reverse() });
  } catch (error) {
    console.log(error);
  }
});

//to get a single contact
router.get("/stock/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const stock = await Stock.findOne({ _id: id });

    return res.status(200).json({ ...stock._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
