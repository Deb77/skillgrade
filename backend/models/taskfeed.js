'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskFeed extends Model {
    static associate(models) {
      // define association here
    }
  }
  TaskFeed.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      work_upload: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      task_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'TaskFeed'
    }
  );
  return TaskFeed;
};
