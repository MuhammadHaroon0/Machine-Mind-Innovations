const express=require('express')
const router=express.Router()
const {getOne,createOne,updateOne,deleteOne}=require('../controllers/handlerFactory');
const testimonialModel = require('../models/testimonialModel');
const { restriction, protect } = require('../controllers/authController');
const { getAll } = require('../controllers/testimonialController');

router.route('/').get(getAll).post(protect,restriction('client'),createOne(testimonialModel));
router.route('/:id').get(getOne(testimonialModel)).patch(protect,restriction('client'),updateOne(testimonialModel)).delete(protect,restriction('admin'),deleteOne(testimonialModel));

module.exports=router