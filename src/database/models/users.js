'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Users.belongsTo(models.Rols, {
        as: 'rol',
        foreignKey: 'rol_id'
      })
      Users.hasMany(models.Addresses, {
        as:'addresses',
        foreignKey: 'user_id'
      })
      Users.belongsToMany(models.Products, {
        as: 'products',
        through: 'Favorites',
        foreignKey: 'user_id',
        otherKey: 'product_id'
      })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday_date: DataTypes.DATE,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rol_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true
  });
  return Users;
};