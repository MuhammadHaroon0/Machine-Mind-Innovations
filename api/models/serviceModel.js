const mongoose = require("mongoose");
const featureSchema = require("./featureModel");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "name is required"],
    minLength: 4,
    maxLength: 255,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    minLength: 7,
  },
  image: {
    type: String,
    // required:[true,'description is required'],
  },
  features: {
    type: [featureSchema],
    // required: [true, "Features are required for services"],
    validate: {
      validator: function (val) {        
        return val.length > 0;
      },
      message: "At least one feature is required",
    },
  },
  technologies: {
    type: [String],
  },
  avgRating:{
    type:Number,
    default:3.5,
    min:1,
    max:5
  }
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
  
// })

// serviceSchema.pre(/^find/, function (next) {
//   // this.populate("testimonials");
//   next();
// });

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// tourSchema.post('save', function (doc, next) {
//   next();
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

// usually for child-parent referencing
serviceSchema.virtual('testimonials',{
    ref:'testimonials',
    foreignField:'service',
    localField:'_id'
})

module.exports = mongoose.model("services", serviceSchema);
