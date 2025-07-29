/**
 * Custom error-handling middleware for Express
 * Handles common Mongoose errors: 
 * - Invalid ObjectId (CastError)
 * - Duplicate key errors (code 11000)
 * - Validation errors (ValidationError)
 */

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;

  //Handle invalid ObjectId (CastError)
  if (err.name === 'CastError') {
    message = `Resource not found with id: ${err.value}`;
    statusCode = 404;
  }

  //Handle duplicate key errors (e.g., email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field: '${field}' already exists`;
    statusCode = 409; // Conflict
  }

  // Handle validation errors (e.g., missing required fields)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => val.message);
    message = `Validation failed: ${errors.join(', ')}`;
    statusCode = 400;
  }

  // Send standardized error response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorMiddleware;
