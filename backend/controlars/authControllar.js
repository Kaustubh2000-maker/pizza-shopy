const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("./../utils/appError");
// const sendEmail = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOpti0ns = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOpti0ns.secure = true;

  res.cookie("jwt", token, cookieOpti0ns);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //   const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedat: req.body.passwordChangedat,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
  // const token = signToken(newUser._id);
  // res.status(201).json({
  //   status: "success",
  //   token,
  //   user: { newUser },
  // });
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) taking email and password from req.body
  const { email, password } = req.body;

  // 2) findin user with findOne email and selecting password because it is set falce in model
  const user = await User.findOne({ email }).select("+password");

  // 3) If user is not present OR the password passed is not preset
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("either the email or password is wrong", 401));
  }
  //  4) If all above conditions are okay then create token
  createSendToken(user, 201, res);

  // const token = signToken(user._id);
  // res.status(201).json({
  //   status: "success",
  //   token,
  // });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),

    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
});

exports.isLoggedIn = async (req, res, next) => {
  const token = req.body.token; // Get token from request body
  // console.log(token);
  // console.log("running");

  if (token) {
    try {
      // Token verification
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      // Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // Check if user has recently changed password
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // Only grant access if user is authenticated
      res.locals.user = currentUser;

      // Respond with user data
      return res.status(200).json({
        status: "success",
        data: {
          user: currentUser,
        },
      });
    } catch (err) {
      return next();
    }
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "User not logged in" });
  }
};
exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting token and checking if token is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in !! log in first", 401));
  }

  //   2) Token verification
  // const decoded = await promisify(jwt.verify(token, process.env.JWT_SECRET));
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // above line doesn't work due to functions hence modifed line should be written

  // 3) check if user still existes
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The User is deleted after Generating key", 404));
  }

  //4)  check if User has recently changed
  if (currentUser.changedPassowordAfter(decoded.iat)) {
    return next(new AppError("The user has changed password after login", 404));
  }

  // only grant access if all above 4 conditions are true
  req.user = currentUser;
  next();
});

exports.ristirctTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you have no permission to perform this action", 404)
      );
    }
    next();
  };
};

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // 1) get user based on posted email
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new AppError("No user with this email", 404));
//   }

//   // 2) generate random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });

//   // 3) send it to user email

//   const resetUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/resetPassword/${resetToken}`;

//   const message = ` forget your password? submit a patch request to ${resetUrl}. \n if did't do this please ignore !!`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "your password reset token valid for 10 minutes",
//       message,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "token sent to email",
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     return next(
//       new AppError(
//         "there was an error while sending email, please try again later!!!"
//       ),
//       500
//     );
//   }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // creating a hashtoken from the original token send to url
//   const hashToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   // finding a user based on the DB Token compare to hashtoken and passwoerd expired time should be more than current time
//   const user = await User.findOne({
//     passwordResetToken: hashToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   // if user not found
//   if (!user) {
//     return next(new AppError("Token is invalid or Expired", 500));
//   }

//   // if usr found
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   user.save();

//   // send token which will login
//   createSendToken(user, 201, res);

//   // const token = signToken(user._id);
//   // res.status(201).json({
//   //   status: "success",
//   //   token,
//   // });
// });

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from colloection . User protect before this fuction in route so req.user will be available
  const user = await User.findById(req.params.id).select("+password");

  // 2) check if posted current password is correct

  if (!(await user.correctPassword(req.body.passwordCurrnet, user.password))) {
    return next(new AppError("Your currnet password is incorrect", 401));
  }
  // 3) if current password is correct save new password

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // console.log("entered");
  // 4) login user send JWT
  createSendToken(user, 201, res);
});
