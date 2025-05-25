const { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    return await airplaneRepository.create(data);
  } catch (error) {
    throw new Error(`Error creating airplane: ${error.message}`);
  }
}

module.exports = { createAirplane };
