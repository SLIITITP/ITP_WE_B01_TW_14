const router = require("express").Router();
const mongoose = require("mongoose");

const { validateEmployee, Employee } = require("../models/Employee");
const auth = require("../middlewares/auth");

//create employee
router.post("/employee", auth, async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    datejoined,
    department,
    designation,
  } = req.body;

  const { error } = validateEmployee(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newEmployee = new Employee({
      firstname,
      lastname,
      email,
      phone,
      datejoined,
      department,
      designation,
      postedBy: req.user._id,
    });
    //save the user
    const result = await newEmployee.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//fetch employees
router.get("/myemployees", auth, async (req, res) => {
  try {
    const employee = await Employee.find().populate("postedBy", "-password");

    return res.status(200).json({ employee: employee });
    // return res.status(200).json({ employee: employee.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update employee
router.put("/employee", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const employee = await Employee.findOne({ _id: id });

    if (req.user._id.toString() !== employee.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't update this employee" });
    }
    const updatedData = { ...req.body, id: undefined };
    // const result = await Employee.updateOne({ _id: id }, updatedData);
    const result = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated contact and send it back to the client
    const updatedEmployee = await Employee.findById(id);
    return res.status(200).json(updatedEmployee);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//delete employee
router.delete("/deleteemp/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const employee = await Employee.findOne({ _id: id });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    if (req.user._id.toString() !== employee.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't delete this employee" });
    }
    const result = await Employee.deleteOne({ _id: id });
    const employees = await Employee.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ employees: employees });
    // return res.status(200).json({ employees: employees.reverse() });
  } catch (error) {
    console.log(error);
  }
});

//to get a single contact
router.get("/employee/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const employee = await Employee.findOne({ _id: id });

    return res.status(200).json({ ...employee._doc });
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

// The purpose of auth in this code is to ensure that the user making the request is authenticated before allowing them to create a new contact.

// This is done by passing auth as middleware to the router.post method. When the route is accessed, the auth middleware function will run first and verify if the user is authenticated. If the user is authenticated, the middleware will call the next function, allowing the request to continue and the handler function to execute. If the user is not authenticated, the middleware will return a response with an appropriate error message and prevent the handler function from executing.

// By including req.user._id as the postedBy field in the newContact object, the code also ensures that the contact is associated with the user who created it. This allows for better organization and tracking of contacts in the database.
