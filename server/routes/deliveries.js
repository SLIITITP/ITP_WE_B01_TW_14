const router = require("express").Router();
const mongoose = require("mongoose");
//let Delivery = require("../models/delivery");
const { Employee } = require("../models/Employee");

// const { validateDelivery, Delivery } = require("../models/delivery");
const { Delivery } = require("../models/delivery");
const auth = require("../middlewares/auth");

//Add sales representative
router.post("/delivery", auth, async (req, res) => {
  const { EmployeeID, Territory } = req.body;

  // const { error } = validateDelivery(req.body);

  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }

  try {
    // Verify if the empid exists in the employee database
    const employee = await Employee.findOne({ EmployeeID });
    if (!employee) {
      return res.status(400).json({ error: "Employee does not exist" });
    }

    const newdelivery = new Delivery({
      EmployeeID: employee.empid,
      Territory,
      postedBy: req.user._id,
    });
    //save the user
    const result = await newdelivery.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//fetch sales reps
router.get("/mydeliveries", auth, async (req, res) => {
  try {
    const delivery = await Delivery.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ delivery: delivery });
    // return res.status(200).json({ employee: employee.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update sales reps
router.put("/delivery", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const delivery = await Delivery.findOne({ _id: id });

    if (req.user._id.toString() !== delivery.postedBy._id.toString()) {
      return res.status(401).json({
        error: "Unauthorized! You can't update this sales repsentative",
      });
    }
    const updatedData = { ...req.body, id: undefined };
    // const result = await Employee.updateOne({ _id: id }, updatedData);
    const result = await Delivery.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated sales rep and send it back to the client
    const updatedDelivery = await Delivery.findById(id);
    return res.status(200).json(updatedDelivery);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//delete sales representative
router.delete("/deletedelivery/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const delivery = await Delivery.findOne({ _id: id });
    if (!delivery) {
      return res.status(404).json({ error: "Sales representative not found" });
    }
    if (req.user._id.toString() !== delivery.postedBy._id.toString()) {
      return res.status(401).json({
        error: "Unauthorized! You can't delete this sales representative",
      });
    }
    const result = await Delivery.deleteOne({ _id: id });
    const deliveries = await Delivery.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ deliveries: deliveries });
    // return res.status(200).json({ employees: employees.reverse() });
  } catch (error) {
    console.log(error);
  }
});

//to get a single contact
router.get("/delivery/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const delivery = await Delivery.findOne({ _id: id });

    return res.status(200).json({ ...delivery._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// router.route("/").get((req,res)=>{ // display method
//     Delivery.find().then((Deliveries)=>{
//         res.json(Deliveries)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

//update method
//frontend eken student ge ID eka pass kranna oni backend ekata , ID eken thama student keekwa uniquely identify kranne
//useer data update kranne put method eken,post method ekath use krnne puluwn
//id=salesRepID
// router.route("/update/:id").put(async(req,res)=>{
//     let userID = req.params.id;
//     //front end eken ewanne  object ekak.. e object eke tiyanwa salesRepID,EmployeeID,Territory kiyala api update krana oni data tika..e 3 ewanwa object ekak widiyata backend ekata request eke body eke..e request eke body eke tiyana values tika palleha widiyata object ekakata dagannwa api
//     const{EmployeeID,Territory} = req.body; //destructure method eken thani line eken request body eke tiyana data 3 variables 3kata assign akaragnna puluwn instead of writing 3 lines like in the add method

//     const updateDelivery = {

//         EmployeeID,
//         Territory
//     }

//     const update = await Delivery.findByIdAndUpdate(userID,updateDelivery).then(()=>{

//          //update eka success nm status eka 200 kiyala front end ekata yawanwa
//     res.status(200).send({status:"User Updated"})

//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"Error with updating data",error: err.message});
//     })

// })

//delete method
// router.route("delete/:id").delete(async(req,res)=>{
//     let userID = req.params.id; //delete karanna ID eka witharak front end eken tibbama athi

//     await Delivery.findByIdAndDelete(userID).then(()=>{
//         res.status(200).send({status: "User deleted"});
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status: "Error with delete user", error: err.message});
//     })

// })

// //single user kenekge withark data fetch karana widiya
// router.route("/get/:id").get(async(req,res)=>{
//     let userID = req.params.id;
//     const user = await Delivery.findById(userID).then((salesrep)=>{
//         res.status(200).send({status: "User fetched",salesrep})
//     }).catch(()=>{
//         console.log(err.message);
//         res.status(500).send({status: "Error with get user", error: err.message});

//     })
// })

// module.exports = router;

//********************************

// const router = require("express").Router();
// let Delivery = require("../models/delivery");

// router.route("/add").post((req,res)=>{
//     const EmployeeID = req.body.EmployeeID;
//     const Territory = req.body.Territory;

//     const newdelivery = new Delivery({
//         EmployeeID,
//         Territory
//     })

//     newdelivery.save().then(()=>{
//         res.json("Sales rep added") // res.json eken wenne api response ekak widiyata yawanwa json format eken
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

// router.route("/").get((req,res)=>{ // display method
//     Delivery.find().then((Deliveries)=>{
//         res.json(Deliveries)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// //update method
// //frontend eken student ge ID eka pass kranna oni backend ekata , ID eken thama student keekwa uniquely identify kranne
// //useer data update kranne put method eken,post method ekath use krnne puluwn
// //id=salesRepID
// router.route("/update/:id").put(async(req,res)=>{
//     let userID = req.params.id;
//     //front end eken ewanne  object ekak.. e object eke tiyanwa salesRepID,EmployeeID,Territory kiyala api update krana oni data tika..e 3 ewanwa object ekak widiyata backend ekata request eke body eke..e request eke body eke tiyana values tika palleha widiyata object ekakata dagannwa api
//     const{EmployeeID,Territory} = req.body; //destructure method eken thani line eken request body eke tiyana data 3 variables 3kata assign akaragnna puluwn instead of writing 3 lines like in the add method

//     const updateDelivery = {

//         EmployeeID,
//         Territory
//     }

//     const update = await Delivery.findByIdAndUpdate(userID,updateDelivery).then(()=>{

//          //update eka success nm status eka 200 kiyala front end ekata yawanwa
//     res.status(200).send({status:"User Updated"})

//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"Error with updating data",error: err.message});
//     })

// })

// //delete method
// router.route("delete/:id").delete(async(req,res)=>{
//     let userID = req.params.id; //delete karanna ID eka witharak front end eken tibbama athi

//     await Delivery.findByIdAndDelete(userID).then(()=>{
//         res.status(200).send({status: "User deleted"});
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status: "Error with delete user", error: err.message});
//     })

// })

// //single user kenekge withark data fetch karana widiya
// router.route("/get/:id").get(async(req,res)=>{
//     let userID = req.params.id;
//     const user = await Delivery.findById(userID).then((salesrep)=>{
//         res.status(200).send({status: "User fetched",salesrep})
//     }).catch(()=>{
//         console.log(err.message);
//         res.status(500).send({status: "Error with get user", error: err.message});

//     })
// })

// module.exports = router;
