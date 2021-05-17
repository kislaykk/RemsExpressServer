module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'type');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'type', {
      type: Sequelize.STRING,
    });
  },
};
