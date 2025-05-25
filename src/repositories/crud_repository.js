const { where } = require("sequelize");
const { Logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error(
        `Error creating instance: ${error.message}`,
        "CrudRepository",
        { data }
      );
      throw new Error(`Error creating instance: ${error.message}`);
    }
  }

  async destroy(data) {
    try {
      return await this.model.destroy({
        where: {
          id: data,
        },
      });
    } catch (error) {
      Logger.error(
        `Error destroying all instances: ${error.message}`,
        "CrudRepository",
        {}
      );
      throw new Error(`Error destroying all instances: ${error.message}`);
    }
  }

  async get(data) {
    try {
      return await this.model.findByPk(data);
    } catch (error) {
      Logger.error(
        `Error get instances: ${error.message}`,
        "CrudRepository",
        {}
      );
      throw new Error(`Error get instances: ${error.message}`);
    }
  }
  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      Logger.error(
        `Error get all instances: ${error.message}`,
        "CrudRepository",
        {}
      );
      throw new Error(`Error get all instances: ${error.message}`);
    }
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async update(id, data) {
    try {
      return await this.model.update(data, { where: { id: id } });
    } catch (error) {
      Logger.error(
        `Error updating instance: ${error.message}`,
        "CrudRepository",
        { id, data }
      );
      throw new Error(`Error updating instance: ${error.message}`);
    }
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async findAll(query = {}, options = {}) {
    return await this.model.find(query, null, options);
  }
}

module.exports = CrudRepository;
