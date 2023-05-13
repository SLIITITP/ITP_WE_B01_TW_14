const express = require("express");
const router = express.Router();
const moment = require("moment");
const repair = require("../models/repair");
const repairuploads = require("../multerConfig/storageConfig");

const auth = require("../middlewares/auth");

//register vehicle to system
router.post(
  "/addrepair",
  repairuploads.single("invoiceImg"),auth,
  async (req, res) => {
    const file = req.file.filename;
    const { registerNo, addedDriver, garage, Amount, comment } = req.body;

    if (
      !registerNo ||
      !addedDriver ||
      !garage ||
      !Amount ||
      !file ||
      !comment
    ) {
      return res.status(422).json("plz fill the data");
    }

    try {
      const dateadded = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const addrepair = new repair({
        registerNo,
        addedDriver,
        garage,
        Amount,
        invoiceImg: file,
        comment,
        dateadded,
      });

      await addrepair.save();
      res.status(201).json(addrepair);
      console.log(addrepair);
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

module.exports = router;
