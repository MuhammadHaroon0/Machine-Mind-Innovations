const { protect } = require("../controllers/authController");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const express=require('express')
const router=express.Router()
const path = require('path');

const getUserImage=catchAsync(async(req,res,next)=>{
    doc=await userModel.findById(req.params.name).select({image:1});
    if(!doc)
    {
        return next(new AppError('Doc not found matching this id!',404))
    }
    
    const imgpath=path.join(__dirname,"..","/public/users/"+doc.image)
   res.sendFile(imgpath)
})

const getServiceImage=catchAsync(async(req,res,next)=>{
    const imgpath=path.join(__dirname,"..","public/services/"+req.params.name)
    res.sendFile(imgpath)
})

router.get('/user/:name',protect,getUserImage)
router.get('/service/:name',getServiceImage)

module.exports=router