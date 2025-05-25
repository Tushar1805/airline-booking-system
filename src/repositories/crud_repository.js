const { where } = require("sequelize");
const { Logger } = require("../config");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app_error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (response === 0) {
      throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(id) {
    const airplane = await this.model.findByPk(id);
    if (!airplane) {
      console.log(`Airplane with ID ${id} not found`);
      throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
    }
    return airplane;
  }
  async getAll() {
    return await this.model.findAll();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async update(id, data) {
    return await this.model.update(data, { where: { id: id } });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async findAll(query = {}, options = {}) {
    return await this.model.find(query, null, options);
  }
}

module.exports = CrudRepository;
