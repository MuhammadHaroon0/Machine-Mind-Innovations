module.exports=function(asyncFunction)
{
    return (req,res,next)=>{
        asyncFunction(req,res,next).catch(next) 
    }
}