'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Tasks', 'introduction', { type: Sequelize.TEXT }),
      queryInterface.addColumn('Tasks', 'submission', { type: Sequelize.TEXT })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Tasks', 'introduction'),
      queryInterface.removeColumn('Tasks', 'submission')
    ]);
  }
};
