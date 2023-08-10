const mongoose = require("mongoose");
const Services = require("./serviceModel");

const testimonialSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min:1,
      max:5
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "Testimonial must belong to user(client)"],
    },
    service: {
      type: mongoose.Schema.ObjectId,
      ref: "services",
      required: [true, "Testimonial must belong to services"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// testimonialSchema.pre(/^find/, function (next) {
  //   this.populate({ path: "user", select: "name" })
  //   .populate({path:'service',select:'name'});
//   next();
// });


// testimonialSchema.pre('save', function (req,next) {
//   // if(req.user==='client')
//   // return next();

//   console.log(req.body);
  
//   next(new AppError('Only clients are allowed to give reviews',403))
// });

//? Aggeregation Middleware, works before or after aggregation function
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//updating the avgRating in services
testimonialSchema.statics.getAvgRating=async function(serviceId){
  const stats=await this.aggregate([
    {
      $match:{service:serviceId}
    },
         {
          $group:{
            _id:'$service',
            avgRating:{$avg:'$rating'}
          }
        }
      ])
      await Services.findByIdAndUpdate(serviceId,{avgRating:stats[0].avgRating})
    }
testimonialSchema.post('save',function(){     
   this.constructor.getAvgRating(this.service)
})
    
    
    // usually for child-parent referencing
    // serviceSchema.virtual('features',{
      //     ref:'features',
      //     foreignField:'service',
      //     localField:'_id'
// })

module.exports = mongoose.model("testimonials", testimonialSchema);
