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
      course_type: {
        type: DataTypes.ENUM({
          values: ['WEB_DEV', 'UI_DESIGN', 'SKETCHING', 'CONTENT_WRITING']
        }),
        allowNull: false
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
        allowNull: false
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
