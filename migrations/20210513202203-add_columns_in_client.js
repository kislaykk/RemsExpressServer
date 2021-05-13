/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients', 'secret', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('clients', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('clients', 'secret');
    await queryInterface.removeColumn('clients', 'password');
  },
};
