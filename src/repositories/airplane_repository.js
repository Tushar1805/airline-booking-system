const CrudRepository = require("./crud_repository");
const { Airplane } = require("../models");

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }

  async getByModelNumber(modelNumber) {
    try {
      return await this.model.findOne({ where: { modelNumber: modelNumber } });
    } catch (error) {
      throw new Error(`Error getting airplane by model number: ${error.message}`);
    }
  }

  async getAllWithCapacityGreaterThan(capacity) {
    try {
      return await this.model.findAll({
        where: {
          capacity: {
            [this.model.Sequelize.Op.gt]: capacity,
          },
        },
      });
    } catch (error) {
      throw new Error(`Error getting airplanes with capacity greater than ${capacity}: ${error.message}`);
    }
  }
}

module.exports = AirplaneRepository;