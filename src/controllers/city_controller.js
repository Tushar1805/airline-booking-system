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

module.exports = {
  createCity,
};
