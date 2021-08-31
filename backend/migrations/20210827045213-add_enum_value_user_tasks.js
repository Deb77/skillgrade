'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TYPE "enum_UserTasks_status" ADD VALUE 'IN_REVIEW'`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `DROP TYPE "enum_UserTasks_status"; CREATE TYPE "enum_UserTasks_status" as enum('IN_PROGRESS', 'COMPLETE'); `
    );
  }
};
