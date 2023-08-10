const AppError = require("./../utils/AppError");

const handleJWTExpiryError=()=>{
    return new AppError('Token is expired!', 401);
}

const handleJWTVerificationError=()=>{
    return new AppError('Invalid token passed!', 401);
}

const handleValidationError=(error)=>{
    const errors = Object.values(error.errors).map((err) => err.message);
    message = errors.join('. ');
    return new AppError(message, 400);
}

const handleCastError=(error)=>{
    message= `Invalid ${error.path}: ${error.value}`
    return new AppError(message,400)  //400 for bad request
}

const handleDuplicateFieldsError=(error)=>{
    // console.log(error);
    // const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value,please try another value`
    return new AppError(message, 400)
}
const handleDevelopmentError=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack,
    })
}

const handleProductionError=(err,res)=>{
    if(err.isOperational===true){  //developer created error
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
        })
    }
    else  //some other error
    {
        console.error(err);  
        res.status(500).json({
            status:'error',
            message:'Something went wrong',
        })
    }
}

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    handleDevelopmentError(err,res);
  } else if (process.env.NODE_ENV === "production") {
      let error = JSON.parse(JSON.stringify(err));  //deep copy
    //   console.log(err);
      let finalError;
      if(error.name==='CastError')  //invalid id
      finalError=handleCastError(error)

    if(error.code===11000)        //duplicate fields
    finalError=handleDuplicateFieldsError(error)
    
    if (error.name === 'ValidationError') //invalid data
    finalError = handleValidationError(error)
    
    if(error.name==='JsonWebTokenError') //invalid token
    finalError = handleJWTVerificationError()

    if (error.name === 'TokenExpiredError')  //expired token
    finalError = handleJWTExpiryError();
    
    handleProductionError(finalError?finalError:err,res);
  }
};
