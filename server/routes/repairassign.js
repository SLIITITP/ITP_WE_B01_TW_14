const express = require("express");
const router = express.Router();
const assign = require("../models/repairassign");
const nodemailer = require("nodemailer");

//assign driver to vehicle to system
router.post("/assigndrivertorepair", async (req, res) => {
  //console.log(req.body);

  const { registerNo, driver, driverMail, garage, vehicleIssue } = req.body;

  if (!registerNo || !driver || !driverMail || !garage || !vehicleIssue) {
    return res.status(422).json("plz fill the data");
  }

  try {
    const driverassign = new assign({
      registerNo,
      driver,
      driverMail,
      garage,
      vehicleIssue,
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
      subject: "Sending Email for Maintenance and Repair Assignment",
      html:
        "<h1>Southern Agro Serve Pvt Limited</h1> <h2>Mr " +
        driver +
        ",</h2> <h2> To repair " +
        registerNo +
        " vehicle, go to " +
        garage +
        " garage and do the repair. </h2> <h2>Vehicle Issue : " +
        vehicleIssue +
        "</h2>",
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
