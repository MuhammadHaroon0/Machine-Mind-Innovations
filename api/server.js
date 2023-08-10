////////////////////////////Packages
const mongoose=require('mongoose')
require('dotenv').config({
    path:'./config.env'
})

process.on('uncaughtException',(err)=>{
    console.log(`${err.name} : ${err.message}`);
    console.log('Shutting down App');
    process.exit(1);
})

///////////////////////////Files
const app=require('./app')

if(process.env.NODE_ENV==='development')
{

    const port=(process.env.PORT || 5000)
    const server=app.listen(port,()=>{
        console.log('Server started at port ' +port);
        
    })
    process.on("unhandledRejection",(err,promise)=>{
        console.log(`${err.name} : ${err.message}`);
        console.log(`Atpromise: ${promise}`);
        console.log('Shutting down App');
        // server.close(()=>{
        //     process.exit(1)
        // })
    })
}

module.exports=app