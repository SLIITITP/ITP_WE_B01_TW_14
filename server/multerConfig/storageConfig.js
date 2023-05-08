const multer = require("multer");

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./vehicleuploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
})

//img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
        callback(null,true)
    }else{
        callback(new Error("only .png .jpg & .jpeg formatted Allowed"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});

module.exports = upload;