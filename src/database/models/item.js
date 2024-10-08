'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    paranoid: true
  });
  return Item;
};