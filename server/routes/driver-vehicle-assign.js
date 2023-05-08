const express = require("express");
const router = express.Router();
const assign = require("../models/driver-vehicle-assign");
const nodemailer = require("nodemailer");

//assign driver to vehicle to system
router.post("/assigndriver", async (req, res) => {
  //console.log(req.body);

  const { registerNo, driver, driverMail } = req.body;

  if (!registerNo || !driver || !driverMail) {
    return res.status(422).json("plz fill the data");
  }

  try {
    const driverassign = new assign({
      registerNo,
      driver,
      driverMail,
    });

    await driverassign.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhanukadayanana@gmail.com",
        pass: "cpmskaqbawieinqt",
      },
    });

    const mailOptions = {
      from: "bhanukadayanana@gmail.com",
      to: driverMail,
      subject: "Sending Email Driver-Vehicle Assignment",
      html:
        "<h1>Southern Agro Serve Pvt Limited</h1> <h2>Mr " +
        driver +
        "</h2> <h2> You have been allocated " +
        registerNo +
        " vehicle for deliver items today </h2>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        // res.status(201).json({status:201,info})
        return res.status(201).json(driverassign);
      }
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
