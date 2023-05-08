const express = require("express");
const router = express.Router();
const moment = require("moment");
const vehicles = require("../models/vehicle");
const vehicleuploads = require("../multerConfig/storageConfig");
//const auth = require("../middlewares/auth");

//register vehicle to system
router.post(
  "/registerVehicle",
  vehicleuploads.single("vehicleImg"),
  async (req, res) => {
    //console.log(req.body);
    const file = req.file.filename;
    console.log(file);
    const {
      registerNo,
      brand,
      model,
      vehicleType,
      vehicleColor,
      manufactureYear,
      fuelType,
      vehicleStatus,
      chassisNo,
      LicenceExpiredDate,
      InsuranceExpiredDate,
    } = req.body;

    // const {error} = validateVehicle(req.body);

    // if(error){
    //     return res.status(400).json({ error: error.details[0].message });
    // }

    //check all the missing fields
    if (
      !registerNo ||
      !brand ||
      !model ||
      !vehicleType ||
      !vehicleColor ||
      !manufactureYear ||
      !fuelType ||
      !file ||
      !vehicleStatus ||
      !chassisNo ||
      !LicenceExpiredDate ||
      !InsuranceExpiredDate
    ) {
      res.status(422).json({ error: `Please enter all the required fields` });
    }

    // Register No validation.
    if (registerNo.length > 9)
      return res
        .status(400)
        .json({ error: "Register No can only be less than 9 characters" });

    // Chassis No validation.
    if (chassisNo.length > 30)
      return res
        .status(400)
        .json({ error: "Register No can only be less than 30 characters" });

    try {
      const prevehicle = await vehicles.findOne({ registerNo: registerNo });
      console.log(prevehicle);

      if (prevehicle) {
        res.status(422).json("this vehicle is already register");
      } else {
        const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

        const addvehicle = new vehicles({
          registerNo,
          brand,
          model,
          vehicleType,
          vehicleColor,
          manufactureYear,
          fuelType,
          vehicleImg: file,
          vehicleStatus,
          chassisNo,
          LicenceExpiredDate,
          InsuranceExpiredDate,
          datecreated,
        });

        await addvehicle.save();
        res.status(201).json(addvehicle);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

//get vehicle data
router.get("/getdata", async (req, res) => {
  try {
    const vehicledata = await vehicles.find();
    res.status(201).json(vehicledata);
    //console.log(vehicledata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get individual vehicle
router.get("/getVehicle/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const vehicleindividual = await vehicles.findById({ _id: id });
    console.log(vehicleindividual);
    res.status(201).json(vehicleindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//update vehicle data
router.patch(
  "/updatevehicle/:id",
  vehicleuploads.single("vehicleImg"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        registerNo,
        brand,
        model,
        vehicleType,
        vehicleColor,
        manufactureYear,
        fuelType,
        vehicleStatus,
        chassisNo,
        LicenceExpiredDate,
        InsuranceExpiredDate,
      } = req.body;
      //const file = req.file ? req.file.filename : vehicleImg1

      const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      // const updatedvehicle = await vehicles.findByIdAndUpdate(id, req.body, {
      //     new:true
      // });

      const updatedvehicle = await vehicles.findByIdAndUpdate(
        { _id: id },
        {
          registerNo,
          brand,
          model,
          vehicleType,
          vehicleColor,
          manufactureYear,
          fuelType,
          vehicleStatus,
          chassisNo,
          LicenceExpiredDate,
          InsuranceExpiredDate,
          dateUpdated,
        },
        {
          new: true,
        }
      );

      console.log(updatedvehicle);
      res.status(201).json(updatedvehicle);
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

//delete vehicle
router.delete("/deletevehicle/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletevehicle = await vehicles.findByIdAndDelete({ _id: id });

    console.log(deletevehicle);
    res.status(201).json(deletevehicle);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/search/:key", async (req, res) => {
  let data = await vehicles.find({
    $or: [{ registerNo: { $regex: req.params.key } }],
  });
  res.send(data);
});

module.exports = router;
