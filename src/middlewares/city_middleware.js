const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app_error");

/**
 * Middleware to validate the request body for creating an airplane.
 * Ensures that the modelNumber is provided in the request body.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function validateCreateRequest(req, res, next) {
  console.log(req.body);

  if (req.body === undefined) {
    ErrorResponse.message = "City name is required";
    ErrorResponse.error = new AppError(
      ["City name not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
