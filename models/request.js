const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      request.belongsTo(models.client, {
        name: 'clientId',
        onDelete: 'CASCADE',
      });
      request.belongsTo(models.property, {
        name: 'propertyId',
        onDelete: 'CASCADE',
      });
    }
  }
  request.init({
    propertyId: DataTypes.INTEGER,
    requestType: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};
