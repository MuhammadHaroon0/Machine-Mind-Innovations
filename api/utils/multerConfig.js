const multer  = require('multer')

// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images/users')
//     },
//     filename: function (req, file, cb) {
//         const ext=file.mimetype.split('/')[1]
//       cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//     }
//   })

const multerStorage=multer.memoryStorage();

  const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image'))
    {
        cb(null,true)
    }
    else
    {
         cb(new AppError('Not and Image! Please upload a valid image!',400),false)
    }
  }

  module.exports=multer({
    storage:multerStorage,
    fileFilter:multerFilter
  })
