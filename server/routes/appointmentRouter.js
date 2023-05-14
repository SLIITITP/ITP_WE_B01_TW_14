const express = require('express');
const Appointments = require("../models/appointmentSchema");
const router = express.Router();
const moment = require("moment-timezone");
const auth = require("../middlewares/auth");


//Add a new appointment
router.post('/addAppointment', auth, async (req, res) => {
    try {
        const { name, date, start, end, email } = req.body;

        // Check if there is an existing appointment that overlaps with the requested time slot
        const overlappingAppointment = await Appointments.findOne({
            date: date,
            $or: [
                { start: { $lt: end }, end: { $gt: start } },
                { start: { $gte: start, $lte: end } },
                { end: { $gte: start, $lte: end } }
            ]
        });

        if (overlappingAppointment) {
            // Appointment is not available
            return res.status(400).json({ message: 'Appointment is not available.' });
        } else {
            // Appointment is available
            const newAppointment = new Appointments({ name, date, start, end, email });
            await newAppointment.save();
            res.status(200).json({ message: 'Appointment added successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

  
//Check the availability 
router.post('/availability', auth, async (req, res) => {
    try {
      const { date, start, end } = req.body;
  
      // Check if there is an existing appointment with the same date and overlapping start and end times
      const existingAppointment = await Appointments.findOne({
        date,
        $or: [
          { start: { $lte: start }, end: { $gte: start } }, // New appointment starts within existing appointment
          { start: { $lte: end }, end: { $gte: end } }, // New appointment ends within existing appointment
          { start: { $gte: start }, end: { $lte: end } } // New appointment fully contains existing appointment
        ]
      });

      if (existingAppointment) {
        // Appointment is not available
        return res.status(400).json({ message: 'Appointment is not available.' });
      } else {
        // Appointment is available
        return res.status(200).json({ message: 'Appointment is available.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

//Get all appointment details
router.get('/allAppointment', auth, (req, res) => {
Appointments.find({})
    .then(data => {
    res.status(200).json(data);
    })
    .catch(err => {
    res.status(500).send(err);
    });
});


  //Get appointment details on ID
router.get('/appointment/:id', auth, (req, res) => {
Appointments.findById(req.params.id)
    .then(data => {
    res.status(200).json(data);
    })
    .catch(err => {
    res.status(500).send(err);
    });
});


//Update the apoointment
router.put("/editAppointment/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, date, start, end, email } = req.body;
      const appointment = await Appointments.findById(id);
      
      // Check if the appointment exists
      if (!appointment) {
        return res.status(404).send({ message: "Appointment not found" });
      }
      
      // Check if the date, start, and end have been changed
      const isDateChanged = date && date !== appointment.date;
      const isStartChanged = start && start !== appointment.start;
      const isEndChanged = end && end !== appointment.end;
      
      if (isDateChanged || isStartChanged || isEndChanged) {
        // Check if there is an existing appointment with the same date, start time, and end time
        const existingAppointment = await Appointments.findOne({
          _id: { $ne: id },
          date,
          $or: [
            { start: { $gte: start, $lt: end } },
            { end: { $gt: start, $lte: end } },
            { $and: [{ start: { $lte: start } }, { end: { $gte: end } }] },
          ],
        });
        
        if (existingAppointment) {
          // Appointment is not available
          return res.status(400).json({ message: 'Appointment is not available.' });
        }
      }
      
      // Update the appointment
      appointment.name = name || appointment.name;
      appointment.date = date || appointment.date;
      appointment.start = start || appointment.start;
      appointment.end = end || appointment.end;
      appointment.email = email || appointment.email;
      
      await appointment.save();
      
      res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  

//delete a appointment
router.delete("/deleteAppointment/:id", auth, async (req, res) => {

try {
    const appointment = await Appointments.findByIdAndDelete(req.params.id);
    if (!appointment) {
        return res.status(404).send({ message: "appointment not found" });
    }
        res.status(200).send({ message: "appointment deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
}
});


// Delete appointment if date and time are expired
router.delete('/autoDeleteAppointment',auth, async (req, res) => {
  try {
    const appointment = await Appointments.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date + 'T' + appointment.start + ':00');
    if (currentDate > appointmentDate) {
      await Appointments.findByIdAndDelete(req.params.id);
      return res.status(200).send({ message: 'Appointment deleted successfully' });
    }
    return res.status(400).send({ message: 'Appointment date and time have not expired yet' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});


module.exports = router;