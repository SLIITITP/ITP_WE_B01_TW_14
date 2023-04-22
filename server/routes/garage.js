const express = require("express");
const router = express.Router();
const { validateGarage, garage } = require("../models/garage");
const auth = require("../middlewares/auth");

router.post("/addGarage", auth, async (req, res) => {
  //console.log(req.body);

  const { garageName, garageOwner, Address, Email, ContactNo } = req.body;

  const { error } = validateGarage(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (!garageName || !garageOwner || !Address || !Email || !ContactNo) {
    res.status(422).json("plz fill the data");
  }

  try {
    const addgarage = new garage({
      garageName,
      garageOwner,
      Address,
      Email,
      ContactNo,
    });

    await addgarage.save();
    res.status(201).json(addgarage);
    console.log(addgarage);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get garage data
router.get("/getgaragedata", auth, async (req, res) => {
  try {
    const garagedata = await garage.find();
    res.status(201).json(garagedata);
    console.log(garagedata);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
