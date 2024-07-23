class CustomAPIError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (statusCode, msg) => {
  return new CustomAPIError(statusCode, msg);
};

module.exports = { CustomAPIError, createCustomError };
