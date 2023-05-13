const express = require("express");
const router = express.Router();
const moment = require("moment");
const fuel = require("../models/fuel");
const auth = require("../middlewares/auth");

router.post("/addFuel", auth, async (req, res) => {
  //console.log(req.body);

  const { registerNo, fuelType, capacity, Amount, fillingStation } = req.body;

  if (!registerNo || !fuelType || !capacity || !Amount || !fillingStation) {
    return res.status(422).json("plz fill the data");
  }

  try {
    const fueldate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    const addfuel = new fuel({
      registerNo,
      fuelType,
      capacity,
      Amount,
      fillingStation,
      fueldate,
    });

    await addfuel.save();
    res.status(201).json(addfuel);
    console.log(addfuel);
  } catch (error) {
    res.status(422).json(error);
  }
});


router.get("/getfueldata",auth, async (req, res) => {
  try {

      //const { registerNo, startDate, endDate, driverName } = req.query;
      const vehicleNo = req.query.vehicleNo || ""
      const startDate = req.query.startDate || ""
      const endDate = req.query.endDate || ""

      const query = {
          registerNo : {$regex:vehicleNo, $options: "i"},
          //deliverdate : { $gte: new Date(startDate), $lte: new Date(endDate) }
      };

      if(startDate && endDate){
          query.fueldate = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }


      const fueldata = await fuel.find(query);
      res.status(201).json(fueldata);
      //console.log(vehicledata);
      //console.log(runningdata)
  } catch (error) {
      res.status(422).json(error);
  }
})

module.exports = router;
