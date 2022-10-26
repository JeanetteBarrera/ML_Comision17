'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Addresses.belongsTo(models.Users, {
        as:'user',
        foreignKey: 'user_id'
      })

    }
  }
  Addresses.init({
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    cod_postal: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Addresses',
    timestamps: true
  });
  return Addresses;
};