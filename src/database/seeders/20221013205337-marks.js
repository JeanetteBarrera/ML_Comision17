'use strict';

let allMarks = ['Apple', 'Samsung', 'Motorola', 'LG', 'Nokia', 'Huawei', 'Xioami', 'Sony', 'Alcatel', 'Lenovo', 'Ryzen', 'Acer', 'Dell', 'HP', 'Nikon', 'Canon', 'Fuji Film', 'Philips', 'Simmons', 'Morph', 'BGH', 'Whirlpool', 'Oster', 'Atma', 'Electrolux', 'Nespresso', 'Peabody', 'Philco', 'Gafa', 'Liliana', 'Otros'];


let marks = allMarks.map(mark => {
  let item = {
    name: mark,
    banner: 'default-category-img.jpg',
    createdAt: new Date, 
    updatedAt: new Date
  }
  return item
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Marks', marks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Marks', null, {});
  }
};
