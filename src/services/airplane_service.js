const { AirplaneRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app_error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    return await airplaneRepository.create(data);
  } catch (error) {
    console.log(error.name);
    
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

module.exports = { createAirplane };
