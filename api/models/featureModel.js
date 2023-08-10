const mongoose=require('mongoose')

const featureSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minLength:4,
        maxLength:255
    },
    description:{
        type:String,
        required:[true,'description is required'],
        minLength:7,
    },
})

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending


//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// featureSchema.pre(/^find/,function(next){
//     this.populate({
//         path:'service',
//         select:'-__v -features -description -technologies'
//      })
//     next()
// })

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

//usually for child-parent referencing
// userSchema.virtual('',{
//  
// })

module.exports=featureSchema