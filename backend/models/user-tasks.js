'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTasks extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserTasks.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: DataTypes.ENUM({
          values: ['IN_PROGRESS', 'COMPLETE']
        }),
        defaultValue: 'IN_PROGRESS'
      },
      work_upload: {
        type: DataTypes.STRING
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
      modelName: 'UserTasks'
    }
  );
  return UserTasks;
};
