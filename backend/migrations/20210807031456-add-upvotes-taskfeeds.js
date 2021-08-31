'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('TaskFeeds', 'upvotes', {
      type: Sequelize.ARRAY(Sequelize.UUID),
      defaultValue: []
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('TaskFeeds', 'upvotes');
  }
};
