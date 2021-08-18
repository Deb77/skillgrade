'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate(models) {
      // define association here
    }
  }
  Tasks.init(
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
      course_name: {
        type: DataTypes.ENUM({
          values: ['WEB_DEV', 'UI_DESIGN', 'SKETCHING', 'CONTENT_WRITING']
        }),
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
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      videos: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      tools_and_sources: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      introduction: {
        type: DataTypes.TEXT
      },
      submission: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'Tasks'
    }
  );
  return Tasks;
};
