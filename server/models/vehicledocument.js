const mongoose = require("mongoose");

const vehicleDocumentSchema = new mongoose.Schema({
    registerNo: {type:String, required: true},
    imgpath: {type:String, required: true},
    documentType: {type:String, required: true},
    date: {type:Date}
    
});

const vehicledocument = mongoose.model("vehicledocument", vehicleDocumentSchema);

module.exports = vehicledocument;