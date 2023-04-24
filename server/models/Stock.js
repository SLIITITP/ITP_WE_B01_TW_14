const mongoose = require('mongoose');
 const Joi = require('joi');


const stockSchema = new mongoose.Schema({
         stockid: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        // image: {
        //     type: String,
        //     required: true
        // },
        category: {
            //  type: mongoose.Schema.Types.ObjectId,
            //  ref: 'Category',
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        costprice: {
            type: Number,
            required: true
        },
        sellingprice: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            max: 1000
        },
       
        supplier: {
            type: String,
            required: true
        },
    
        dateadded: {
            type: Date,
            default: Date.now
            
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        

});

 stockSchema.pre("save", async function (next) {
     try {
         let count = await this.constructor.countDocuments({});
         let id = `SP${(count + 1).toString().padStart(3, "0")}`;
         let duplicate = true;
    
         // Check if id already exists in the database
        while (duplicate) {
           const existingStock = await this.constructor.findOne({ stockid: id });
           if (!existingStock) {
             duplicate = false;
           } else {
             count++;
             id = `SP${(count + 1).toString().padStart(3, "0")}`;
           }
         }
    
         this.stockid = id;
         next();
       } catch (err) {
         next(err);
       }
 });

const Stock = new mongoose.model('Stock', stockSchema);


 const validateStock = (data) => {
     const schema = Joi.object({
         name: Joi.string().required(),
        // Image: Joi.number().required(),
        category: Joi.string().required(),
         description: Joi.string().required(),
        costprice: Joi.string().required(),
        sellingprice: Joi.string().required(),
        quantity: Joi.number().required(),
        supplier: Joi.string().required(),
     });

     return schema.validate(data);
 };

 module.exports  = {
     validateStock,
     Stock
 }