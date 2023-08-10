const testimonial = require("../models/testimonialModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAll=catchAsync(async(req,res,next)=>{
    const doc=await testimonial.find().populate('user').populate('service');
     
    return res.status(200).json({
        status:'success',
        totalResults:doc.length,
        data:{
            doc
        }
    })
})