const mongoose = require('mongoose');
const Joi = require("joi");

const Schema = mongoose.Schema;

//mongoddb wlain api ennter karana hama document ekakata automatically eya hadanwa podi primary key ekak ID kiyala
//e ID eka characters n numbers combine wela hadena unique key ekak
// e uniquie ID eken puluwn eka document ekak withark access karanna
//update karaddi api use kranne ID kiyana property eka
const scheduleSchema = new Schema({ //mongodn wala special feature ekak thamai api object ID ekak generate kre nathi unath mokakhari document ekak insert karama ekata adala auto object ID ekak generate karala denwa

    deliveryscheduleID : {
        type : String,
        unique :true
    },
    orderID : {
        type : String,
        required: [true, "Please add a Order ID"],
    },
    date : {
        type : String,
        required: [true, "Please add a delivery date"],
    },
    destination : {
        type : String,
        required: [true, "Please add a destination"],
    },
    //we use this to find who has added the salary
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

scheduleSchema.pre("save", async function (next) {

    try {
   
   let count = await this.constructor.countDocuments({});
   
    let id = `DS${(count + 1).toString().padStart(3, "0")}`;
   
    let duplicate = true;
   
   
   
   
    // Check if id already exists in the database
   
   while (duplicate) {
   
    const existingContact = await this.constructor.findOne({ deliveryscheduleID: id });
   
    if (!existingContact) {
   
    duplicate = false;
   
    } else {
   
    count++;
   
   id = `SR${(count + 1).toString().padStart(3, "0")}`;
   
    }
   
   }
   
   
   
   
   this.deliveryscheduleID = id;
   
   next();
   
    } catch (err) {
   
   next(err);
   
    }
   
   });


const Schedule = mongoose.model("Schedule",scheduleSchema);

const validateSchedule = (data) => {
    const schema = Joi.object({
        orderID: Joi.string().min(3).required(),
        date: Joi.string().min(4).max(100).required(),
        destination: Joi.string().min(3).max(100000000000).required(),
      
    });
  
    return schema.validate(data);
  };

module.exports = {validateSchedule,Schedule};




// const mongoose = require('mongoose');


// const Schema = mongoose.Schema;

// //mongoddb wlain api ennter karana hama document ekakata automatically eya hadanwa podi primary key ekak ID kiyala
// //e ID eka characters n numbers combine wela hadena unique key ekak
// // e uniquie ID eken puluwn eka document ekak withark access karanna
// //update karaddi api use kranne ID kiyana property eka
// const scheduleSchema = new Schema({ //mongodn wala special feature ekak thamai api object ID ekak generate kre nathi unath mokakhari document ekak insert karama ekata adala auto object ID ekak generate karala denwa

//     deliveryscheduleID : {
//         type : String,
//         unique :true
//     },
//     orderID : {
//         type : String,
//         required: true
//     },
//     date : {
//         type : Date,
//         required: true
//     },
//     destination : {
//         type : String,
//         required: true
//     },
// })

// scheduleSchema.pre("save", async function (next) {

//     try {
   
//    let count = await this.constructor.countDocuments({});
   
//     let id = `DS${(count + 1).toString().padStart(3, "0")}`;
   
//     let duplicate = true;
   
   
   
   
//     // Check if id already exists in the database
   
//    while (duplicate) {
   
//     const existingContact = await this.constructor.findOne({ deliveryscheduleID: id });
   
//     if (!existingContact) {
   
//     duplicate = false;
   
//     } else {
   
//     count++;
   
//    id = `SR${(count + 1).toString().padStart(3, "0")}`;
   
//     }
   
//    }
   
   
   
   
//    this.deliveryscheduleID = id;
   
//    next();
   
//     } catch (err) {
   
//    next(err);
   
//     }
   
//    });


// const Schedule = mongoose.model("Schedule",scheduleSchema);

// module.exports = Schedule;