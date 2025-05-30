"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Airplane", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      modelNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true, // Ensures the model number is alphanumeric
        },
      },
      capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          max: 1000, // Assuming a maximum capacity of 1000 for an airplane
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Airplane");
  },
};
