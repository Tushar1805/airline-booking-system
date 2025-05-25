const { AirplaneRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app_error");
const { get } = require("../routes");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    return await airplaneRepository.create(data);
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let message = [];
      error.errors.forEach((err) => {
        message.push(err.message);
      });
      console.log(message);

      throw new AppError(message, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {

    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airplane You requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airplane You requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot delete airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = { createAirplane, getAirplanes, getAirplane, destroyAirplane };
