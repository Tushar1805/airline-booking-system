const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

/**
 * Middleware to validate the request body for creating an airplane.
 * Ensures that the modelNumber is provided in the request body.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Model number is required";
    ErrorResponse.error = {
      message: "Model number is required in correct form",
    };

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
