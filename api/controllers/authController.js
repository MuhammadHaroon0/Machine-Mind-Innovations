const Users = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/AppError");
const Email = require("./../utils/email");
const crypto=require('crypto')


function signToken(id,res) {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  const cookieOptions={
    expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRY*24*60*60*1000),
    httpOnly:true
  }
  if(process.env.NODE_ENV==='production')
  {
    cookieOptions.secure=true
  }
  res.cookie('jwt',token,cookieOptions)
  return token;
}

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await Users.create(req.body);
  const token = signToken(newUser._id,res);

  try {
    await new Email(newUser).sendWelcome();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({
    status: "success",
    token: token,
    data: {
      name: newUser.name,
      id: newUser._id,
      role: newUser.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError("Please provide both email and password!", 400));

  const found = await Users.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!found) return next(new AppError("Please provide valid email!", 400));

  if (!(await found.correctPassword(req.body.password)))
    return next(new AppError("Please provide valid email and password!", 400));
    
    found.isActive=true
    await found.save()
  const token = signToken(found._id,res);

  return res.status(200).json({
    status: "success",
    data: {
      id:found._id,
      name: found.name,
      token: token,
      role:found.role
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt || req.header("x-auth-token");
  if (!token) return next(new AppError("Please provide auth token!", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const found = await Users.findById(decoded.id);
  if (!found) return next(new AppError("User not exists!", 401));

  if(found.checkPasswordchanged(decoded.iat))
  return next(new AppError("User changed the password!", 401));
  
  if(!found.isActive)
  return next(new AppError("User no longer exists! Login to activate your account again", 403));

  req.user = found;
  next();
});

exports.restriction = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("Access denied!", 403));
    next();
  };
};


exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email)
    return next(new AppError("Please provide an email!", 404));

  const found = await Users.findOne({ email: req.body.email }).select("+email");
  if (!found) return next(new AppError("Please provide a valid email!", 404));

  const resetToken = found.getPasswordResetToken();
  try {
    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    await new Email(found).sendResetPassword(url);
    await found.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Password reset token sent",
    });
  } catch (error) {
    found.passwordResetToken = undefined;
    found.passwordResetTokenExpires = undefined;
    await found.save({ validateBeforeSave: false });
    next(
      new AppError("Email not sent for password reset!Try again later", 500)
      );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  
  //on clicking the button in frontend patch the request to this route
    const resetToken=  crypto.
         createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
        const found = await Users.findOne({
            passwordResetToken: resetToken,
            passwordResetTokenExpires: { $gt: Date.now() },
        });
        if(!found)
        return next(new AppError("Token is invalid or expired!", 400))
        
        found.password=req.body.password
        found.confirmPassword=req.body.confirmPassword
        found.passwordResetToken=undefined
        found.passwordResetTokenExpires=undefined
        
        // console.log(req.body);
        await found.save()
        const token=signToken(found._id,res)
        res.status(200).json({
            status:'success',
            token:token
        })
});

exports.updatePassword=catchAsync(async(req,res,next)=>{
  if(!req.body.oldPassword)
  return next(new AppError("Please provide your old password!", 400))
  
  const found=await Users.findById(req.user.id).select('+password');
  if(!await found.correctPassword(req.body.oldPassword))
  return next(new AppError("Old password is incorrect!", 400))

  found.password=req.body.password
  found.confirmPassword=req.body.confirmPassword
  await found.save();

  const token=signToken(found._id,res)
  res.status(200).json({
    status:'success',
    token:token,
})
})
