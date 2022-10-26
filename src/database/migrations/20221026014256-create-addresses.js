'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cod_postal: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unsigned: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unsigned: true,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};