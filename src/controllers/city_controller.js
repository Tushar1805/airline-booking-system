const { CityService } = require("../services");

const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app_error");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/***
 ** POST: /api/v1/cities
 * @description Creates a new city
 * @param {name:'Hinganghat'} req
 */
async function createCity(req, res) {
  try {
    const data = req.body;
    const city = await CityService.createCity({
      name: data.name,
    });
    SuccessResponse.message = "City created successfully";
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating the city";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** GET: /api/v1/cities/
 * @description Gets all cities
 * @return {Array} - List of all cities
 */

async function getAllCities(req, res) {
  try {
    const cities = await CityService.getAllCities();
    SuccessResponse.message = "Cities fetched successfully";
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);

    ErrorResponse.message = "Something went wrong while fetching the cities";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** DELETE: /api/v1/cities/:id
 * @description Deletes a city by ID
 * @param {int} id - The ID of the city to delete
 * @access Public
 */

async function destroyCity(req, res) {
  try {
    await CityService.destroyCity( req.params.id);
    SuccessResponse.message = "City deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while deleting the city";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/***
 ** PATCH: /api/v1/cities/:id
 * @description Deletes a city by ID
 * @param {int} id - The ID of the city to delete 
 * @param {Object} data - The data to update the city with
 * @access Public
 */

async function updateCity(req, res) {
  try {
    const data = req.body;
    const response = await CityService.updateCity(req.params.id, data);
    SuccessResponse.message = "City updated successfully";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while updating the city";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createCity,
  destroyCity,
  getAllCities,
  updateCity,
};
