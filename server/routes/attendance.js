const router = require("express").Router();
const mongoose = require("mongoose");

const { validateAttendance, Attendance } = require("../models/Attendance");
const { Employee } = require("../models/Employee");
const auth = require("../middlewares/auth");

//Mark attendance
router.post("/attendance", auth, async (req, res) => {
  const { empid, date, entrytime, offtime } = req.body;

  // const { error } = validateAttendance(req.body);

  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }

  try {
    // Verify if the empid exists in the employee database
    const employee = await Employee.findOne({ empid });
    if (!employee) {
      return res.status(400).json({ error: "Employee does not exist" });
    }

    const newAttendance = new Attendance({
      empid: employee._id,
      date,
      entrytime,
      offtime,
      postedBy: req.user._id,
    });
    //save attendance
    const result = await newAttendance.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

//NOTES:

//Spread operator (...) is used to copy the properties of an object to another object.
//._doc defines name, address, email and phone
//.populate() is used to populate the data from the referenced documents.
//.reverse() is used to reverse the order of the array.
//.toString() is used to convert the object id to string.
//.findByIdAndUpdate() is used to update the document by its id.
//.findById() is used to find the document by its id.
//.deleteOne() is used to delete the document by its id.
//.deleteMany() is used to delete all the documents.
//.findOne() is used to find the document by its id.
//.find() is used to find all the documents.
//.save() is used to save the document.
//.updateOne() is used to update the document by its id.
//.updateMany() is used to update all the documents.
//.create() is used to create the document.
//.isValidObjectId() is used to check if the id is valid or not.
//.status() is used to set the status code.
//.json() is used to send the response in json format.
//.params is used to get the parameters from the url.
//.body is used to get the data from the body of the request.
//.get() is used to get the data from the server.
//.post() is used to post the data to the server.
//.put() is used to update the data on the server.
//.delete() is used to delete the data from the server.
//.use() is used to use the middleware.
//.use() is used to use the router.
//.listen() is used to listen to the port.
//.connect() is used to connect to the database.
//.then() is used to execute the code after the promise is resolved.
//.catch() is used to execute the code after the promise is rejected.
//.env is used to store the environment variables.
