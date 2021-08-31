'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Tasks', 'videos', {
      type: Sequelize.ARRAY(Sequelize.JSON)
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Tasks', 'videos', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    });
  }
};
