const Users = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");
const upload = require("./../utils/multerConfig");
const sharp = require("sharp");

exports.uploadUserImage = upload.single("image");

exports.resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.fileName}`);
  next();
});

exports.getAll = catchAsync(async (req, res, next) => {
  let doc = new APIFeatures(Users.find({ isActive: { $ne: false } }), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();
  doc = await doc.query;
  return res.status(200).json({
    status: "success",
    totalResults:doc.length,
    data: {
      doc,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const doc = await Users.findByIdAndUpdate(
    req.user.id,
    { isActive: false },
    { new: true }
  );
  return res.status(204).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.fileName;
  const doc = await Users.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});
