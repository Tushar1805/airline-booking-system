const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app_error");
const { get } = require("../routes");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    return await airportRepository.create(data);
  } catch (error) {
    console.log(error);

    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let message = [];
      error.errors.forEach((err) => {
        message.push(err.message);
      });
      console.log(message);

      throw new AppError(message, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airport You requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airport You requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot delete airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airport You requested to update is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot update airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirport,
  getAirport,
  getAirports,
  destroyAirport,
  updateAirport,
};
