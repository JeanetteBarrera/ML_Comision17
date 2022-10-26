'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Subcategories, {
        as: 'subcategory',
        foreignKey: 'subcategory_id'
      })
      Products.belongsTo(models.Marks, {
        as: 'mark',
        foreignKey: 'mark_id'
      })
      Products.belongsToMany(models.Users, {
        as: 'likes_users',
        through : 'Favorites',
        foreignKey: 'product_id',
        otherKey: 'user_id',
        timestamps: false
      })
    }
  }
  Products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    subcategory_id: DataTypes.INTEGER,
    mark_id: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Products',
    timestamps: true
  });
  return Products;
};