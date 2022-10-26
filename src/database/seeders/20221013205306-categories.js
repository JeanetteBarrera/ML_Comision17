'use strict';

/** @type {import('sequelize-cli').Migration} */

let allCategories = ['Tecnologia', 'Hogar y Muebles', 'Electrodomésticos', 'Juegos y juguetes', 'Belleza y Cuidado Personal', 'Industrias y Oficinas', 'Herramientas'];

//let allBanners = []
/*
let categories = [
  { name: 'Tecnologia', banner: 'default-category-img.jpg', createdAt: new Date, updatedAt: new Date },
  { name: 'Hogar y Muebles', banner: 'default-category-img.jpg', createdAt: new Date, updatedAt: new Date },
  { name: 'Electrodomésticos', banner: 'default-category-img.jpg', createdAt: new Date, updatedAt: new Date },
  { name: 'Juegos y juguetes', banner: 'default-category-img.jpg', createdAt: new Date, updatedAt: new Date },
  { name: 'Belleza y Cuidado Personal', banner: 'default-category-img.jpg', createdAt: new Date, updatedAt: new Date },
  { name: 'Industrias y Oficinas', banner: 'default-category-img.jpg', createdAt: new Date, updatedAt: new Date },
  { name: 'Herramientas', banner: 'default-category-img.jpg', createdAt: new Date, updatedAt: new Date },
]*/
let categories = allCategories.map(category => {
  let item = {
    name: category,
    banner: 'default-category-img.jpg',
    createdAt: new Date, 
    updatedAt: new Date
  }
  return item
})

module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
