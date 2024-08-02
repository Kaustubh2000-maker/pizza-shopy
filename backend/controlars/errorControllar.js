const AppError = require("../utils/appError");

// const handleCastErrorDB = (err) => {
//   const message = `Invalid ${err.path} : ${err.value}.`;
//   return new AppError(message, 404);
// };

// const handleDuplicateFieldsDB = (err) => {
//   // const value = err.errmsg.match(/(["'])(\\?.)*?\1/g);
//   // above is code from lecture not working due to updates used beolow as own
//   const value = err.keyValue.name;
//   const message = `Duplicate field value '${value}' please change to another value`;
//   return new AppError(message, 404);
// };

// const handleValidationErrorDB = (err) => {
//   const errors = Object.values(err.errors).map((el) => el.message);
//   const message = `Invalid input data ${errors.join(". ")}`;
//   return new AppError(message, 404);
// };

// const handleJWTError = () => {
//   return new AppError("Token is Invalid !!!", 404);
// };
// const handleJWTExpiredError = () => {
//   return new AppError("Token is Expired !!!", 404);
// };
// // ////////////////////////////////////////////////////////////////////////////////////////
const sendErrorDev = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
  console.log(err);
};
// ////////////////////////////////////////////////////////////////////////////////////////

const sendErrorprod = (err, res) => {
  // Operational error: trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statuscode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programing error or other unknown err : don't leak error details
  else {
    // 1) log the error
    console.error("ERROR 🔥");
    console.log(err);

    // 2) Send generic messsage
    res.status(500).json({
      status: "Error",
      message: "something went very wrong ",
      err: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "developement") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, name: err.name, message: err.message };

    // here ...err not copying its err.name property did it manually
    // if (error.name === "CastError") error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // if (error.name === "ValidationError")
    //   error = handleValidationErrorDB(error);

    // if (error.name === "JsonWebTokenError") error = handleJWTError();
    // if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorprod(error, res);
  }
};
