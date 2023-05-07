// const express = require("express");
// const router = express.Router();
// const moment = require("moment");
// const runningrecord = require("../models/runningrecord");

// router.post("/addRecords", async (req, res) => {
//   //console.log(req.body);

//   const {
//     registerNo,
//     driverName,
//     noOfMiles,
//     routeDetails,
//     DeliverTime,
//     comment,
//   } = req.body;

//   if (
//     !registerNo ||
//     !driverName ||
//     !noOfMiles ||
//     !routeDetails ||
//     !DeliverTime ||
//     !comment
//   ) {
//     res.status(422).json("plz fill the data");
//   }

//   try {
//     const deliverdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

//     const addrunnigrecords = new runningrecord({
//       registerNo,
//       driverName,
//       noOfMiles,
//       routeDetails,
//       DeliverTime,
//       comment,
//       deliverdate,
//     });

//     await addrunnigrecords.save();
//     res.status(201).json(addrunnigrecords);
//     console.log(addrunnigrecords);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });

const express = require("express");
const router = express.Router();
const moment = require("moment");
const {validateRunningRecords, runningrecord} = require("../models/runningrecord");
const auth = require("../middlewares/auth");

router.post("/addRecords",auth, async(req, res) => {
    //console.log(req.body);

    const {registerNo,driverName,noOfMiles,routeDetails, DeliverTime, comment} = req.body;

    const {error} = validateRunningRecords(req.body);

    if(error){
        return res.status(400).json({ error: error.details[0].message });
    }

    if(!registerNo || !driverName || !noOfMiles || !routeDetails || !DeliverTime || !comment){
        res.status(422).json("plz fill the data");
    }

    try {

        const deliverdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const addrunnigrecords = new runningrecord({
                registerNo,driverName,noOfMiles,routeDetails, DeliverTime, comment, deliverdate
            });

            await addrunnigrecords.save();
            res.status(201).json(addrunnigrecords);
            console.log(addrunnigrecords);

    } catch (error) {
        res.status(422).json(error);
    }
})

router.get("/getvehiclerunningdata",auth, async (req, res) => {
    try {
        const runningdata = await runningrecord.find();
        res.status(201).json(runningdata);
        //console.log(vehicledata);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
