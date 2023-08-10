const Services = require("../models/serviceModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const upload = require("./../utils/multerConfig");
const sharp = require("sharp");

exports.getTopRatedService=catchAsync(async(req,res,next)=>{
    const found= await Services.find().sort({avgRating:-1}).limit(1);
    if(!found)
    return next(new AppError('No document found!',404))
    res.status(200).json({
        status:'success',
        result:found
    })
})

exports.uploadServiceImage = upload.single("image");

exports.resizeServiceImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.fileName = `service-${req.body.name}-${Date.now()}.jpeg`;
  
  try {
    
      await sharp(req.file.buffer)
      .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/services/${req.file.fileName}`);
  } catch (error) {
    console.log(error);
  }
  next();
});


exports.createOne=catchAsync(async(req,res,next)=>{
    console.log(req.body);
    if(req.file)req.body.image=req.file.fileName
    const doc=await Services.create(req.body);
    return res.status(201).json({
        status:'success',
        data:{
            doc
        }
    })
})