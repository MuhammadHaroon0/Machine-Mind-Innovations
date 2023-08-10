const express=require('express')
const router=express.Router()
const {getAll,getOne,createOne,updateOne,deleteOne}=require('../controllers/handlerFactory');
const productModel = require('../models/productModel');
const { protect, restriction } = require('../controllers/authController');

router.route('/').get(getAll(productModel)).post(protect,restriction('admin'),createOne(productModel));
router.route('/:id').get(protect,restriction('admin'),getOne(productModel)).patch(protect,restriction('admin'),updateOne(productModel)).delete(protect,restriction('admin'),deleteOne(productModel));

module.exports=router