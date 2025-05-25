const { AirplaneService } = require("../services");
const { Airplane } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { get } = require("../routes");

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
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** GET: /api/v1/airplanes
 * @description Fetches all airplanes
 * @returns {Array} List of airplanes
 */
async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.message = "Airplanes fetched successfully";
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error("Error fetching airplanes:", error);
    ErrorResponse.message = "Something went wrong while fetching the airplanes";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** GET: /api/v1/airplanes/:id
 * @param {int} req.params.id - The ID of the airplane to fetch
 * @description Fetches an airplane by its ID
 * @returns {Object} Airplane object with the specified ID
 */

async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.message = "Airplanes fetched successfully";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.error("Error fetching airplanes:", error);
    ErrorResponse.message = "Something went wrong while fetching the airplanes";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
};
