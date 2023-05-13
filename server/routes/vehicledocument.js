const express = require("express");
const router = new express.Router();
const multer = require("multer");
const documents = require("../models/vehicledocument");
const moment = require("moment");
const auth = require("../middlewares/auth");

// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./vehicleuploads");
  },
  filename: (req, file, callback) => {
    callback(null, `imgae-${Date.now()}. ${file.originalname}`);
  },
});

//img filte
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

// //document register
// router.post("/registerImg", upload.single("photo"), async (req, res) => {
//   const { filename } = req.file;

//   const { registerNo, documentType } = req.body;

//   if (!registerNo || !filename || !documentType) {
//     return res.status(401).json({ status: 401, message: "fill all the data" });
//   }

//   try {
//     const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

//     // const documentdata = new documents({
//     //     registerNo:registerNo,
//     //     imgpath:filename,
//     //     date:date
//     // })

//     const documentdata = new documents({
//       registerNo,
//       documentType,
//       imgpath: filename,
//       date,
//     });

//     //const finaldata = await documentdata.save();

//     //res.status(201).json({status:201,finaldata})
//     await documentdata.save();
//     res.status(201).json(documentdata);
//     console.log(documentdata);
//   } catch (error) {
//     res.status(422).json({ status: 401, error });
//   }
// });

// //update vehicle data
// router.patch(
//   "/updatedocvehicle/:id",
//   upload.single("photo"),
//   async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { registerNo, documentType } = req.body;
//       const file = req.file ? req.file.filename : photo;

//       //const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

//       // const updatedvehicle = await vehicles.findByIdAndUpdate(id, req.body, {
//       //     new:true
//       // });

//       const updateddocvehicle = await documents.findByIdAndUpdate(
//         { _id: id },
//         {
//           registerNo,
//           documentType,
//           imgpath: file,
//         },
//         {
//           new: true,
//         }
//       );

//       await updateddocvehicle.save();
//       console.log(updateddocvehicle);
//       res.status(201).json(updateddocvehicle);
//     } catch (error) {
//       res.status(422).json(error);
//     }
//   }
// );

// // document data ge
// router.get("/getdocumentdata", async (req, res) => {
//   try {
//     const Documentdata = await documents.find();
//     res.status(200).json(Documentdata);
//     //console.log(Documentdata)
//   } catch (error) {
//     res.status(422).json(error);
//   }
//   // const Documentdata = await documents.find();
//   // res.status(200).json(Documentdata);
// });

// // delete document data
// router.delete("/deletedoc/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const dltDocument = await documents.findByIdAndDelete({ _id: id });

//     console.log(dltDocument);
//     res.status(201).json(dltDocument);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });

// router.get("/searchdoc/:key", async (req, res) => {
//   let data = await documents.find({
//     $or: [{ registerNo: { $regex: req.params.key } }],
//   });
//   res.send(data);
// });

// router.get("/getdocVehicle/:id", async (req, res) => {
//   try {
//     console.log(req.params);
//     const { id } = req.params;

//     const vehicleindividualdoc = await documents.findById({ _id: id });
//     console.log(vehicleindividualdoc);
//     res.status(201).json(vehicleindividualdoc);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });


//document register
router.post("/registerImg",upload.single("photo"),auth, async(req,res)=>{

  const {filename} = req.file;

  const {registerNo, documentType} = req.body;


  if(!registerNo || !filename || !documentType){
      return res.status(401).json({status:401,message:"fill all the data"})
  }

  try {

      const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      // const documentdata = new documents({
      //     registerNo:registerNo,
      //     imgpath:filename,
      //     date:date
      // })

      const documentdata = new documents({
          registerNo, documentType,  imgpath:filename, date
      })

      //const finaldata = await documentdata.save();

      //res.status(201).json({status:201,finaldata})
      await documentdata.save();
      res.status(201).json(documentdata);
      console.log(documentdata);

  } catch (error) {
      res.status(422).json({status:401,error})
  }
});

//update vehicle data
router.patch("/updatedocvehicle/:id", upload.single("photo"),auth, async (req, res) => {
  try {
      const { id } = req.params;
      const {  registerNo, documentType} = req.body;
      const file = req.file ? req.file.filename : photo

      //const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      // const updatedvehicle = await vehicles.findByIdAndUpdate(id, req.body, {
      //     new:true
      // });

      const updateddocvehicle = await documents.findByIdAndUpdate({ _id:id }, {
          registerNo, documentType,  imgpath:file
      }, {
          new:true
      });

      await updateddocvehicle.save();
      console.log(updateddocvehicle);
      res.status(201).json(updateddocvehicle)
  } catch (error) {
      res.status(422).json(error);
  }
})

// document data ge
router.get("/getdocumentdata",auth,async(req,res)=>{
  try {
      const Documentdata = await documents.find();
      res.status(200).json(Documentdata);
      //console.log(Documentdata)
  } catch (error) {
      res.status(422).json(error)
  }
  // const Documentdata = await documents.find();
  // res.status(200).json(Documentdata);
});

// delete document data
router.delete("/deletedoc/:id",auth,async(req,res)=>{

  try {
      const {id} = req.params;

      const dltDocument = await documents.findByIdAndDelete({_id:id});

      console.log(dltDocument);
      res.status(201).json(dltDocument)
  } catch (error) {
      res.status(422).json(error);
  }

})

router.get("/searchdoc/:key",auth, async (req, res) => {

  let data = await documents.find(
      {
          "$or": [
              { "registerNo": { $regex: req.params.key} }
          ]
      }
  )
  res.send(data)
})

router.get("/getdocVehicle/:id",auth, async (req, res) => {
  try {
      console.log(req.params);
      const { id } = req.params;

      const vehicleindividualdoc = await documents.findById({ _id: id });
      console.log(vehicleindividualdoc);
      res.status(201).json(vehicleindividualdoc)
  } catch (error) {
      res.status(422).json(error);
  }
})


module.exports = router;
