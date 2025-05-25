const { AirplaneService } = require("../services");
const { Airplane } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/***
 ** POST: /api/v1/airplanes
 * @param {modelNumber:'airbus320', capacity: 200} req
 */
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber, // Default to empty string if not provided
      capacity: req.body.capacity || 0, // Default to 0 if not provided
    });
    SuccessResponse.message = "Airplane created successfully";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Error creating airplane:", error);
    ErrorResponse.message = "Something went wrong while creating the airplane";
    ErrorResponse.error = error;
    return res.status(StatusCodes.CREATED).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
