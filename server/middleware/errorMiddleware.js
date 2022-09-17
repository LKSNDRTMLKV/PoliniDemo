import ErrorHandler from "../utils/errorHandler.js";

function errorMiddleware(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error.";
    let message = "";

    //Wrong MongoDB Id Error
    if (err.name === "CastError") {
        message = `Resourse not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Duplicate Key Error
    if (err.code === 11000) {
        message = `This ${Object.keys(err.keyValue)} already exists`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT Token Error 
    if (err.name === "JsonWebTokenError") {
        message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    // Jwt Token Expire Error
    if (err.name === "TokenExpiredError") {
        message = `Json Web Token is expired, try again `;
        err = new ErrorHandler(message, 400);
    }


    res.status(404).json({
        success: false,
        message: err.message,
    });


};

export default errorMiddleware;