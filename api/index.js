////////////////////////////Packages
const express=require('express')
const app=express();
const mongoose=require('mongoose')

const path=require('path')
require('dotenv').config({
    path:'./config.env'
})
const helmet=require('helmet')
const morgan=require('morgan')
const cors=require('cors')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser=require('cookie-parser')
const connectDB=require('./db')
connectDB()
///////////////////////////Files
const AppError = require('./utils/AppError');
// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
    credentials: true, // This allows cookies to be sent in CORS requests
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
  app.use(helmet())
// if(process.env.NODE_ENV==='development')
app.use(morgan('dev'))

//RATE LIMITING
const limiter = rateLimit({
	windowMs: 45 * 60 * 1000, // 45 minutes
	max: 2000, // Limit each IP to 100 requests per `window` (here, per 45 minutes)
	message:"Too many requests send. Please try again in 45 minutes"
})
app.use('/api',limiter)

//SANITIZATION OF REQUESTS FROM NOSQL INJECTIONS
app.use(mongoSanitize());

//PREVENTING JS OR HTML IN REQUESTS
app.use(xssClean());

//PREVENTING PARAMETER POLLUTION
app.use(hpp({
    whitelist:[  //will not be affected by hpp

    ]
}))

// if(!process.env.JWT_SECRET)
// {
//     console.log("FATAL ERROR: JWT KEY is not found!")
//     process.exit(1)
// }

//ROUTERS
const userRouter=require('./routes/userRoutes.js');
const jobRouter=require('./routes/jobRoutes.js');
const serviceRouter=require('./routes/serviceRoutes.js');
const productRouter=require('./routes/productRoutes.js');
const testimonialRouter=require('./routes/testimonialRoutes.js');
const imageGetter=require('./utils/imageGetter')

//ROUTES
app.use('/api/users',userRouter);
app.use('/api/jobs',jobRouter);
app.use('/api/services',serviceRouter);
app.use('/api/products',productRouter);
app.use('/api/testimonials',testimonialRouter);
app.use('/api/image',imageGetter);
app.get('/',(req,res,next)=>{
    res.send("Hello World")
})
//PREVENTING REACHING UNDEFINED ROUTES
app.all('*',(req,res,next)=>{
    next(new AppError(`Couldn't find the ${req.originalUrl} on this server!`,404))
})

const globalErrorHandler=require('./controllers/errorController')
app.use(globalErrorHandler)
module.exports=app
