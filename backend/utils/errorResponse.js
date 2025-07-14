class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    // Capture stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;