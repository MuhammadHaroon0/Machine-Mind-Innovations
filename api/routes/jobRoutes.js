const express=require('express')
const router=express.Router()
const {getAll,getOne,createOne,updateOne,deleteOne}=require('../controllers/handlerFactory');
const {protect, restriction}=require('../controllers/authController');
const jobModel = require('../models/jobModel');

router.use(protect)
router.use(restriction('admin'))
router.route('/').get(getAll(jobModel)).post(protect,restriction('admin'),createOne(jobModel));
router.route('/:id').get(protect,restriction('admin'),getOne(jobModel)).patch(protect,restriction('admin'),updateOne(jobModel)).delete(protect,restriction('admin'),deleteOne(jobModel));

module.exports=router