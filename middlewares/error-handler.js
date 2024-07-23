const { CustomAPIError } = require("../error/custom-error");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json(error.message);
  }
  return res.status(500).json(error);
};

module.exports = errorHandler;
