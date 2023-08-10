const mongoose=require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto=require('crypto')
const saltRounds = 12;

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minLength:4,
        maxLength:30
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        minLength:4,
        maxLength:50,
        validate:[validator.isEmail,'Email should be valid'],
        select:false
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:7,
        select:false,
        validate: {
            validator: function (value) {
              // Regular expression to match at least one uppercase letter,one lowercase letter, one number, and one special character
              const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/;
              return regex.test(value);
            },
            message:
              'Password must contain at least one uppercase letter,one lowercase letter, one number, and one special character.',
          },
    },
    confirmPassword:{
        type:String,
        required:[true,'confirm password is required'],
        select:false,
        validate: {
            validator: function (val) {
              return this.password === val;
            },
            message: "Passwords are not same",
          },
    },
    role:{
      type:String,
      enum:['admin','employee','client'],
      default:'employee'
    },
    isActive:{
      type:Boolean,
      default:true
    },
    image:{
      type:String,
      default:'default.png'
    },
    passwordResetToken:String,
    passwordResetTokenExpires:Date,
    lastChangedPassword:Date,
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
)

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending


//Document middlewares,can work before or after save or create
// Pre Save Hook
userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next()
  
 this.password=await bcrypt.hash(this.password, saltRounds);
 this.confirmPassword=undefined
    next()
})
userSchema.pre('save', function(next){
  if(!this.isModified('password') || this.isNew) 
  {
    return next()
  }  
  this.lastChangedPassword=Date.now()-1000
  
    next()
})

// userSchema.pre(/^find/,function(next){
//     //query middleware
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

userSchema.methods.correctPassword=async function(password)
{
  return await bcrypt.compare(password,this.password);
}
userSchema.methods.checkPasswordchanged=function(JWTTIMESTAMP)
{
  if(!this.lastChangedPassword)
  return 0;
  const time=this.lastChangedPassword.getTime()/1000
  return time>JWTTIMESTAMP
}
userSchema.methods.getPasswordResetToken=function()
{
  const resetToken=crypto.randomBytes(32).toString('hex');
  this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetTokenExpires=Date.now()+10*60*1000  //expire after 10 minutes
  return resetToken
}

// usually for child-parent referencing
userSchema.virtual('testimonials',{
  ref:'testimonials',
 foreignField:'user',
 localField:'_id'
})

module.exports=mongoose.model('users',userSchema)

