const { AirportService } = require("../services");
const { Airport } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/***
 ** POST: /api/v1/airports
 * @param {name:'IGI', citiId: 5, code: 'DEL', address: 'Delhi sector 6'} req
 */
async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId, // Assuming cityId is provided
    });
    SuccessResponse.message = "Airport created successfully";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Error creating airport:", error);
    ErrorResponse.message = "Something went wrong while creating the airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** GET: /api/v1/airports
 * @description Fetches all airports
 * @returns {Array} List of airports
 */
async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.message = "airports fetched successfully";
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);

    ErrorResponse.message = "Something went wrong while fetching the airports";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** GET: /api/v1/airports/:id
 * @param {int} req.params.id - The ID of the airport to fetch
 * @description Fetches an airport by its ID
 * @returns {Object} airport object with the specified ID
 */

async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.message = "airports fetched successfully";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching the airports";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** DELETE: /api/v1/airports/:id
 * @param {int} req.params.id - The ID of the airport to fetch
 * @description Deletes an airport by its ID
 * @returns {Object} Success message and deleted airport object
 */

async function destroyAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.message = "airport deleted successfully";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while deleting the airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** PATCH: /api/v1/airports/:id
 * @param {int} req.params.id - The ID of the airport to update
 * @param {Object} req.body - The updated airport data
 * @description Updates an airport by its ID
 * @returns {Object} Success message and updated airport object
 */

async function updateAirport(req, res) {
  try {
    const airport = await AirportService.updateAirport(req.params.id, req.body);
    SuccessResponse.message = "airport updated successfully";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while updating the airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
