'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tasks', 'upvotes');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tasks', 'upvotes', {
      type: Sequelize.ARRAY(Sequelize.UUID),
      defaultValue: []
    });
  }
};
