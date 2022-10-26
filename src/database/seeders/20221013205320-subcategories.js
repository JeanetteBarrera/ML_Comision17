'use strict';

/** @type {import('sequelize-cli').Migration} */

let subcategories = [
  { name: 'Camaras', banner: 'camaras-banner-subcategory.webp', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Celulares y Teléfonos', banner: 'celulares-banner-subcategory.webp', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Consolas y Videojuegos', banner: 'consolas-banner-subcategory.webp', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Tablets', banner: 'tablets-banner-subcategory.webp', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Notebooks', banner: 'notebooks-banner-subcategory.webp', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Impresoras', banner: 'impresoras-banner-subcategory.webp', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Auriculares', banner: 'auriculares-banner-subcategory.webp', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Accesorios', banner: 'default-category-img.jpg', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Pc de Escritorio', banner: 'default-category-img.jpg', category_id: 1, createdAt: new Date, updatedAt: new Date },
  { name: 'Baños', banner: 'default-category-img.jpg', category_id: 2, createdAt: new Date, updatedAt: new Date },
  { name: 'Bazar y Cocina', banner: 'default-category-img.jpg', category_id: 2, createdAt: new Date, updatedAt: new Date },
  { name: 'Muebles', banner: 'muebles-banner-subcategory.webp', category_id: 2, createdAt: new Date, updatedAt: new Date },
  { name: 'Decoración', banner: 'decoración-banner-subcategory.webp', category_id: 2, createdAt: new Date, updatedAt: new Date },
  { name: 'Jardín', banner: 'jardin-banner-subcategory.webp', category_id: 2, createdAt: new Date, updatedAt: new Date },
  { name: 'Iluminación', banner: 'iluminacion-banner-subcategory.webp', category_id: 2, createdAt: new Date, updatedAt: new Date },
  { name: 'Cortinas y Accesorios', banner: 'cortinas-banner-subcategory.webp', category_id: 2, createdAt: new Date, updatedAt: new Date },
  { name: 'Aires acondicionados', banner: 'aires-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
  { name: 'Calefacción', banner: 'calefaccion-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
  { name: 'Heladeras', banner: 'heladeras-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
  { name: 'Lavarropas', banner: 'lavarropas-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
  { name: 'Freezers', banner: 'freezer-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
  { name: 'Hornos', banner: 'hornos-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
  { name: 'Cocinas', banner: 'cocinas-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
  { name: 'Microondas', banner: 'microondas-banner-subcategory.webp', category_id: 3, createdAt: new Date, updatedAt: new Date },
]


module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subcategories', subcategories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subcategories', null, {});
  }
};
