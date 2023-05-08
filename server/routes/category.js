const router = require("express").Router();
const mongoose = require("mongoose");

const { validateCategory, Category } = require("../models/Category");
const auth = require("../middlewares/auth");

//create employee
router.post("/category", auth, async (req, res) => {
  const {
    name,
    quantityavailable,
    quantitysold,
    ordersinqueue,
  } = req.body;

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ error: "Category with this name already exists" });
  }

  const { error } = validateCategory(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newCategory = new Category({
      name,
      quantityavailable,
      quantitysold,
      ordersinqueue,
      postedBy: req.user._id,
    });
    //save the user
    const result = await newCategory.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//fetch contacts
router.get("/mycategories", auth, async (req, res) => {
  try {
    const category = await Category.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ category: category });
    // return res.status(200).json({ employee: employee.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update employee
router.put("/category", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const category = await Category.findOne({ _id: id });

    if (req.user._id.toString() !== category.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't update this category" });
    }
    const updatedData = { ...req.body, id: undefined };
    // const result = await Employee.updateOne({ _id: id }, updatedData);
    const result = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated contact and send it back to the client
    const updatedCategory = await Category.findById(id);
    return res.status(200).json(updatedCategory);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//delete employee
router.delete("/deletecategory/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    if (req.user._id.toString() !== category.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't delete this category" });
    }
    const result = await Category.deleteOne({ _id: id });
    const categories = await Category.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ categories: categories });
    // return res.status(200).json({ employees: employees.reverse() });
  } catch (error) {
    console.log(error);
  }
});

//to get a single contact
router.get("/category/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const category = await Category.findOne({ _id: id });

    return res.status(200).json({ ...category._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;