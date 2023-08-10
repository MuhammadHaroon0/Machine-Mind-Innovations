const express=require('express')
const router=express.Router()
const {getAll,getOne,updateOne,deleteOne}=require('../controllers/handlerFactory');
const {getTopRatedService, uploadServiceImage, resizeServiceImage,createOne}=require('../controllers/serviceController');
const serviceModel = require('../models/serviceModel');
const { protect, restriction } = require('../controllers/authController');

router.get('/top-rated-service',getTopRatedService)
router.route('/').get(getAll(serviceModel)).post(protect,restriction('admin'),uploadServiceImage,resizeServiceImage,createOne);
router.route('/:id').get(protect,restriction('admin'),getOne(serviceModel,'testimonials')).patch(protect,restriction('admin'),updateOne(serviceModel)).delete(protect,restriction('admin'),deleteOne(serviceModel));

module.exports=router