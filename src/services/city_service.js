const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app_error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    return await cityRepository.create(data);
  } catch (error) {
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      const messages = error.errors.map((err) => err.message);
      throw new AppError(messages, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllCities() {
  try {
    const response = await cityRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      error.message || "Cannot fetch cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    return await cityRepository.destroy(id);
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new AppError(
        "Cannot delete city as it is associated with other records",
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError("Cannot delete city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateCity(id, data) {
  try {
    const response = await cityRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      const messages = error.errors.map((err) => err.message);
      throw new AppError(messages, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot update city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createCity, destroyCity, getAllCities , updateCity};
