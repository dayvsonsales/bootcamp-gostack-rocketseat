module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('appointments', 'canceled_at', {
      type: Sequelize.DATE,
    });
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn('appointments', 'canceled_at');
  },
};
