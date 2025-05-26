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
  if (!req.body.name) {
    ErrorResponse.message = "Name is required";
    ErrorResponse.error = new AppError(
      ["Name is required in correct form"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.code) {
    ErrorResponse.message = "Code not found";
    ErrorResponse.error = new AppError(
      ["Code is required in correct form"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.cityId) {
    ErrorResponse.message = "cityId not found";
    ErrorResponse.error = new AppError(
      ["city id is required in correct form"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
