'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Categories.hasMany(models.Subcategories, {
        as: 'subcategories',
        foreignKey: 'category_id'
      })
    }
  }
  Categories.init({
    name: DataTypes.STRING,
    banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps: true
  });
  return Categories;
};