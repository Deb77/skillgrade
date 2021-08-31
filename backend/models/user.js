'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      upvoted_tasks: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      }
    },
    {
      sequelize,
      modelName: 'user'
    }
  );
  return user;
};
