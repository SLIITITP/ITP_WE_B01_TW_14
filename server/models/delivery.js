const mongoose = require('mongoose');
const Joi = require("joi");

const Schema = mongoose.Schema;

//mongoddb wlain api ennter karana hama document ekakata automatically eya hadanwa podi primary key ekak ID kiyala
//e ID eka characters n numbers combine wela hadena unique key ekak
// e uniquie ID eken puluwn eka document ekak withark access karanna
//update karaddi api use kranne ID kiyana property eka
const deliverySchema = new Schema({ //mongodn wala special feature ekak thamai api object ID ekak generate kre nathi unath mokakhari document ekak insert karama ekata adala auto object ID ekak generate karala denwa

    // salesRepID : {
    //     type : String,
    //     required: true
    // },
    salesRepID : {
            type : String,
            unique :true
         },
    EmployeeID : {
        type : String,
        required: [true, "Please add Employee Id"],
    },
    Territory : {
        type : String,
        required: [true, "Please add Territory"],
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
})

deliverySchema.pre("save", async function (next) {

     try {
    
    let count = await this.constructor.countDocuments({});
    
     let id = `SR${(count + 1).toString().padStart(3, "0")}`;
    
     let duplicate = true;
    
    
    
    
     // Check if id already exists in the database
    
    while (duplicate) {
    
     const existingContact = await this.constructor.findOne({ salesRepID: id });
    
     if (!existingContact) {
    
     duplicate = false;
    
     } else {
    
     count++;
    
    id = `SR${(count + 1).toString().padStart(3, "0")}`;
    
     }
    
    }
    
    
    
    
    this.salesRepID = id;
    
    next();
    
     } catch (err) {
    
    next(err);
    
     }
    
    });

const Delivery = mongoose.model("Delivery",deliverySchema);

const validateDelivery = (data) => {
    const schema = Joi.object({
        EmployeeID: Joi.string().min(2).max(5).required(),
        Territory: Joi.string().min(3).max(100).required(),
      
    });
  
    return schema.validate(data);
  };


module.exports = {validateDelivery,Delivery};




// //mongoddb wlain api ennter karana hama document ekakata automatically eya hadanwa podi primary key ekak ID kiyala
// //e ID eka characters n numbers combine wela hadena unique key ekak
// // e uniquie ID eken puluwn eka document ekak withark access karanna
// //update karaddi api use kranne ID kiyana property eka
// const deliverySchema = new Schema({ //mongodn wala special feature ekak thamai api object ID ekak generate kre nathi unath mokakhari document ekak insert karama ekata adala auto object ID ekak generate karala denwa

//     // salesRepID : {
//     //     type : String,
//     //     required: true
//     // },
//     salesRepID : {
//             type : String,
//             unique :true
//          },
//     EmployeeID : {
//         type : String,
//         required: true
//     },
//     Territory : {
//         type : String,
//         required: true
//     }
// })

// deliverySchema.pre("save", async function (next) {

//      try {
    
//     let count = await this.constructor.countDocuments({});
    
//      let id = `SR${(count + 1).toString().padStart(3, "0")}`;
    
//      let duplicate = true;
    
    
    
    
//      // Check if id already exists in the database
    
//     while (duplicate) {
    
//      const existingContact = await this.constructor.findOne({ salesRepID: id });
    
//      if (!existingContact) {
    
//      duplicate = false;
    
//      } else {
    
//      count++;
    
//     id = `SR${(count + 1).toString().padStart(3, "0")}`;
    
//      }
    
//     }
    
    
    
    
//     this.salesRepID = id;
    
//     next();
    
//      } catch (err) {
    
//     next(err);
    
//      }
    
//     });

// const Delivery = mongoose.model("Delivery",deliverySchema);


// module.exports = Delivery;