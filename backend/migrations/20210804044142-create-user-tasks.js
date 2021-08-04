'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('UserTasks', {
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('UserTasks');
  }
};
