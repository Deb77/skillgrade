'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Tasks', 'tools_and_sources', {
      type: Sequelize.ARRAY(Sequelize.JSON)
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Tasks', 'tools_and_sources', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    });
  }
};
