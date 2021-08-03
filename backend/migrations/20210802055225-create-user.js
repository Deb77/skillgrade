'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
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
        allowNull: false,
        unique: true
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  }
};
