const router = require("express").Router();
const mongoose = require("mongoose");

const { validateContact, Contact } = require("../models/Contact");
const auth = require("../middlewares/auth");

//create contact
router.post("/contact", auth, async (req, res) => {
  const { name, address, email, phone } = req.body;

  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newContact = new Contact({
      name,
      address,
      email,
      phone,
      postedBy: req.user._id,
    });
    //save the user
    const result = await newContact.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//fetch contacts
router.get("/mycontacts", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ contacts: contacts.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update contact
router.put("/contact", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "No id specified" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const contact = await Contact.findOne({ _id: id });

    if (req.user._id.toString() !== contact.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't update this contact" });
    }
    const updatedData = { ...req.body, id: undefined };
    // const result = await Contact.updateOne({ _id: id }, updatedData);
    const result = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated contact and send it back to the client
    const updatedContact = await Contact.findById(id);
    return res.status(200).json(updatedContact);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//delete contact
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const contact = await Contact.findOne({ _id: id });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    if (req.user._id.toString() !== contact.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized! You can't delete this contact" });
    }
    const result = await Contact.deleteOne({ _id: id });
    const contacts = await Contact.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ contacts: contacts.reverse() });
  } catch (error) {
    console.log(error);
  }
});

//to get a single contact
router.get("/contact/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const contact = await Contact.findOne({ _id: id });

    return res.status(200).json({ ...contact._doc });
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
