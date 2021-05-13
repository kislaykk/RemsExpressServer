const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tenant.belongsTo(models.property, {
        foreignKey: {
          name: 'propertyId',
          onDelete: 'CASCADE',
        },
      });
    }
  }
  tenant.init({
    propertyId: DataTypes.INTEGER,
    leasedById: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tenant',
  });
  return tenant;
};
