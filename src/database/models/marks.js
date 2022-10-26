'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Marks.hasMany(models.Products, {
        as: 'products',
        foreignKey: 'mark_id'
      })
    }
  }
  Marks.init({
    name: DataTypes.STRING,
    banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Marks',
    timestamps: true
  });
  return Marks;
};