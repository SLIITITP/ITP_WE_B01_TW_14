const router = require("express").Router();
const mongoose = require("mongoose");

const { validateProfit, Profit } = require("../models/Profit");
const {Stock} = require("../models/Stock");
const auth = require("../middlewares/auth");

router.post("/profit", auth, async (req, res) => {
  const { stockid, costprice, sellingprice, quantitysold, timeperiod } = req.body;

  const { error } = validateProfit(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Verify if the empid exists in the employee database
    const stock = await Stock.findOne({ stockid });
    if (!stock) {
      return res.status(400).json({ error: "Stock does not exist" });
    }

  const grossprofit = sellingprice - costprice;
  const totalrevenue = sellingprice * quantitysold;
  const profitmargin = (grossprofit / sellingprice) * 100;

  const newProfit = new Profit({
    stockid,
    costprice,
    sellingprice,
    quantitysold,
    timeperiod,
    grossprofit,
    totalrevenue,
    profitmargin,
    postedBy: req.user._id,
  });

  const result = await newProfit.save();
  return res.status(201).json({ ...result._doc });
} catch (err) {
  console.log(error);
  
}
});
router.get("/myprofits", auth, async (req, res) => {
  try {
    const profit = await Profit.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ profit: profit });
    // return res.status(200).json({ employee: employee.reverse() });
  } catch (err) {
    console.log(err);
  }
});
router.get("/profit/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const profit = await Profit.findOne({ _id: id });

    return res.status(200).json({ ...profit._doc });
  } catch (err) {
    console.log(err);
  }
});
router.put("/profit", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const profit = await Profit.findOne({ _id: id });

    if (req.user._id.toString() !== profit.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't update this profit" });
    }
    const updatedData = { ...req.body, id: undefined };
    
    const result = await Profit.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated contact and send it back to the client
    const updatedProfit = await Profit.findById(id);
    return res.status(200).json(updatedProfit);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});
router.delete("/deleteprofit/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const profit = await Profit.findOne({ _id: id });
    if (!profit) {
      return res.status(404).json({ error: "Stock Id not found" });
    }
    if (req.user._id.toString() !== profit.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't delete this profit" });
    }
    const result = await Profit.deleteOne({ _id: id });
    const profits = await Profit.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ profits: profits });
    // return res.status(200).json({ employees: employees.reverse() });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
