const express = require('express');
const Exp = require("../models/expAppSchema");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post('/addExp', auth, async (req, res) => {
    try {
      const {appid } = req.body;
      const newExp = new Exp({ appid});
      const savedExp = await newExp.save();
      res.status(201).json(savedExp);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
});

router.get('/allExp', auth, (req, res) => {
  Exp.find({})
      .then(data => {
      res.status(200).json(data);
      })
      .catch(err => {
      res.status(500).send(err);
      });
  });
  
  router.delete("/deleteExp/:id", auth, async (req, res) => {

    try {
        const appointment = await Exp.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).send({ message: "appointment not found" });
        }
            res.status(200).send({ message: "appointment deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: error.message });
    }
    });
module.exports = router;