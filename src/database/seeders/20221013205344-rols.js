'use strict';

/** @type {import('sequelize-cli').Migration} */

let allRols = ['Admin', 'User', 'Super-admin'];

let rols = allRols.map( rol => {
  let item = {
    name: rol
  }
  return item
})

module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rols', rols, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rols', null, {});
  }
};

