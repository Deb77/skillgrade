'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContentWritingTasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContentWritingTasks.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      max_points: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      time_complete: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      level: {
        type: DataTypes.ENUM({
          values: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
        }),
        allowNull: false
      },
      docs: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      videos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      tools_and_sources: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      upvotes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      }
    },
    {
      sequelize,
      modelName: 'ContentWritingTasks'
    }
  );
  return ContentWritingTasks;
};
