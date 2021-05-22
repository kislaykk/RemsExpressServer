const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class expenditure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      expenditure.belongsTo(models.property, {
        foreignKey: {
          name: 'propertyId',
          onDelete: 'CASCADE',
        },
      });
    }
  }
  expenditure.init({
    cost: DataTypes.INTEGER,
    notes: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'expenditure',
  });

  return expenditure;
};
