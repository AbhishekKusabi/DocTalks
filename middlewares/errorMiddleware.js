class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  

    // error to handle duplicate values
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
        err = new ErrorHandler(message, 400);
    }

// invalid error
    if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is invalid, Try again!`;
      err = new ErrorHandler(message, 400);
    }

// expired error
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is expired, Try again!`;
      err = new ErrorHandler(message, 400);
    }

    // type error (if string is entered in place of number)
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}`,
        err = new ErrorHandler(message, 400);
    }
  
    const errorMessage = err.errors
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(" ")
      : err.message;
  
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;