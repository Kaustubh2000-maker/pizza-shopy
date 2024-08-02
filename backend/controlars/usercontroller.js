const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("./../utils/appError");
const factory = require("./handllerFactory");

const multer = require("multer");
const sharp = require("sharp");

//  below code is for saving photo is storage directly later commented in 202
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// below code for saving on memory as buffer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// exports.updateMe = catchAsync(async (req, res, next) => {
//   //cerate error if user send password
//   if (req.body.password || req.body.rasswordConfirm) {
//     return next(
//       new AppError(
//         "this route is not for password update. please go to /updateMyPassword",
//         401
//       )
//     );
//   }
//   // filter unwanted things
//   const filterBody = filterObj(req.body, "name", "email");
//   if (req.file) filterBody.photo = req.file.filename;
//   //update user
//   const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       updateUser,
//     },
//   });
// });

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create an error if the user sends password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update. Please go to /updateMyPassword.",
        401
      )
    );
  }

  // Filter out unwanted fields from the body
  const filteredBody = filterObj(req.body, "name", "email");

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user, {
    active: false,
  });

  res.status(201).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not valid , Use SignUp for creating user",
  });
};
// exports.addToCart = catchAsync(async (req, res, next) => {
//   const userId = req.params.userId; // Extract userId from URL parameter
//   const newItem = req.body; // Extract new item details from request body

//   // Optionally, verify userId if needed
//   if (!userId) {
//     return next(new AppError("User ID is missing", 400));
//   }

//   const user = await User.findByIdAndUpdate(
//     userId,
//     { $push: { cart: newItem } }, // Use $push operator to add the new item to the cart array
//     { new: true, runValidators: true } // Options to return the updated document and run validators
//   );

//   if (!user) {
//     return next(new AppError("User not found", 404)); // Handle user not found
//   }

//   res.status(200).json({
//     status: "success",
//     data: {
//       cart: user.cart,
//     },
//   });
// });

exports.addToCart = catchAsync(async (req, res, next) => {
  const userId = req.params.userId; // Extract userId from URL parameter
  const newItem = req.body; // Extract new item details from request body

  // console.log(req.body, " req.body add");

  // console.log(newItem);
  newItem.totalPrice = newItem.quantity * newItem.price;
  // console.log(newItem);

  // Optionally, verify userId if needed
  if (!userId) {
    return next(new AppError("User ID is missing", 400));
  }

  // Find the user and get their current cart
  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404)); // Handle user not found
  }

  const cart = user.cart || [];
  let itemFound = false;

  // console.log(user.cart);
  // console.log(newItem);

  // Iterate over the cart to check if the item already exists
  for (let item of cart) {
    if (item.productId === newItem.productId && item.size === newItem.size) {
      // Item found, update the quantity and price
      item.quantity = Number(item.quantity) + Number(newItem.quantity);
      item.price = newItem.price;
      item.totalPrice = item.quantity * item.price; // Assuming price can change, adjust if needed
      itemFound = true;
      break;
    }
  }

  // newItem.size = Number(newItem.size);
  // If item was not found, push the new item to the cart
  if (!itemFound) {
    cart.push(newItem);
  }

  // console.log(newItem);

  // Update the user's cart with the modified cart array
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { cart: cart }, // Update cart array
    { new: true, runValidators: true } // Options to return the updated document and run validators
  );

  res.status(200).json({
    status: "success",
    data: {
      cart: updatedUser.cart,
    },
  });
});

// exports.deleteProduct = catchAsync(async (req, res, next) => {
//   console.log(req.params.id, req.params.productid, req.params.size);
// });

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id, productid, size } = req.params;
  // console.log(id, productid, size);

  // Find the user by ID
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Find the product in the user's cart
  const productIndex = user.cart.findIndex(
    (item) => item.productId == productid && item.size == size
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  // Perform the desired operation, e.g., deleting the product
  user.cart.splice(productIndex, 1);

  // Save the updated user
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "Product removed from cart",
    cart: user.cart,
  });

  next();
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.currentUserId);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  user.cart = [];
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: {
      order: req.newOrder, // Include the new order in the response
    },
  });
});
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
