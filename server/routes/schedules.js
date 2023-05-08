const router = require("express").Router();
const mongoose = require("mongoose");
const { validateSchedule, Schedule } = require("../models/schedule");
const auth = require("../middlewares/auth");

//Add delivery schedule
router.post("/schedule", auth, async (req, res) => {
  const { orderID, date, destination } = req.body;

  const { error } = validateSchedule(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newschedule = new Schedule({
      orderID,
      date,
      destination,
      postedBy: req.user._id,
    });
    //save the user
    const result = await newschedule.save();
    //201 means success
    //._doc defines name, address, email and phone
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//fetch delivery schedules
router.get("/myschedules", auth, async (req, res) => {
  try {
    const schedule = await Schedule.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ schedule: schedule });
    // return res.status(200).json({ employee: employee.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update delivery schedules
router.put("/schedule", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const schedule = await Schedule.findOne({ _id: id });

    if (req.user._id.toString() !== schedule.postedBy._id.toString()) {
      return res
        .status(401)
        .json({
          error: "Unauthorized! You can't update this Delivery Schedule",
        });
    }
    const updatedData = { ...req.body, id: undefined };
    // const result = await Employee.updateOne({ _id: id }, updatedData);
    const result = await Schedule.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // Fetch the updated sales rep and send it back to the client
    const updatedSchedule = await Schedule.findById(id);
    return res.status(200).json(updatedSchedule);

    // return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//delete sales representative
router.delete("/deleteschedule/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const schedule = await Schedule.findOne({ _id: id });
    if (!schedule) {
      return res.status(404).json({ error: "Delivery Schedule not found" });
    }
    if (req.user._id.toString() !== schedule.postedBy._id.toString()) {
      return res
        .status(401)
        .json({
          error: "Unauthorized! You can't delete this delivery schedule",
        });
    }
    const result = await Schedule.deleteOne({ _id: id });
    const schedules = await Schedule.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    return res.status(200).json({ schedules: schedules });
    // return res.status(200).json({ employees: employees.reverse() });
  } catch (error) {
    console.log(error);
  }
});

//to get a single contact
router.get("/schedule/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide an id" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const schedule = await Schedule.findOne({ _id: id });

    return res.status(200).json({ ...schedule._doc });
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
//     //front end eken ewanne  object ekak.. e object eke tiyanwa salesRepID,empid,Territory kiyala api update krana oni data tika..e 3 ewanwa object ekak widiyata backend ekata request eke body eke..e request eke body eke tiyana values tika palleha widiyata object ekakata dagannwa api
//     const{empid,Territory} = req.body; //destructure method eken thani line eken request body eke tiyana data 3 variables 3kata assign akaragnna puluwn instead of writing 3 lines like in the add method

//     const updateDelivery = {

//         empid,
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
//     const empid = req.body.empid;
//     const Territory = req.body.Territory;

//     const newdelivery = new Delivery({
//         empid,
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
//     //front end eken ewanne  object ekak.. e object eke tiyanwa salesRepID,empid,Territory kiyala api update krana oni data tika..e 3 ewanwa object ekak widiyata backend ekata request eke body eke..e request eke body eke tiyana values tika palleha widiyata object ekakata dagannwa api
//     const{empid,Territory} = req.body; //destructure method eken thani line eken request body eke tiyana data 3 variables 3kata assign akaragnna puluwn instead of writing 3 lines like in the add method

//     const updateDelivery = {

//         empid,
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

// const router = require("express").Router();
// let Schedule = require("../models/schedule");

// router.route("/add").post((req,res)=>{

//     const orderID = req.body.orderID;
//     const date = req.body.date;
//     const destination = req.body.destination;

//     const newschedule = new Schedule({

//         orderID,
//         date,
//         destination
//     })

//     newschedule.save().then(()=>{
//         res.json("Delivery Schedule added") // res.json eken wenne api response ekak widiyata yawanwa json format eken
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

// router.route("/").get((req,res)=>{ // display method
//     Schedule.find().then((Schedules)=>{
//         res.json(Schedules)
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
//     //front end eken ewanne  object ekak.. e object eke tiyanwa salesRepID,empid,Territory kiyala api update krana oni data tika..e 3 ewanwa object ekak widiyata backend ekata request eke body eke..e request eke body eke tiyana values tika palleha widiyata object ekakata dagannwa api
//     const{orderID,date,destination} = req.body; //destructure method eken thani line eken request body eke tiyana data 3 variables 3kata assign akaragnna puluwn instead of writing 3 lines like in the add method

//     const updateSchedule = {
//         orderID,
//         date,
//         destination
//     }

//     const update = await Schedule.findByIdAndUpdate(userID,updateSchedule).then(()=>{

//          //update eka success nm status eka 200 kiyala front end ekata yawanwa
//     res.status(200).send({status:"Delivery Schedule Updated"})

//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"Error with updating data",error: err.message});
//     })

// })

// //delete method
// router.route("delete/:id").delete(async(req,res)=>{
//     let userID = req.params.id; //delete karanna ID eka witharak front end eken tibbama athi

//     await Schedule.findByIdAndDelete(userID).then(()=>{
//         res.status(200).send({status: "Delivery Schedule deleted"});
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status: "Error with delete schedule", error: err.message});
//     })

// })

// //single user kenekge withark data fetch karana widiya
// router.route("/get/:id").get(async(req,res)=>{
//     let userID = req.params.id;
//     const user = await Schedule.findById(userID).then((deliveryschedule)=>{
//         res.status(200).send({status: "User fetched",deliveryschedule})
//     }).catch(()=>{
//         console.log(err.message);
//         res.status(500).send({status: "Error with get user", error: err.message});

//     })
// })

// module.exports = router;
