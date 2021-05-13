const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      client.hasOne(models.property, {
        foreignKey: {
          name: 'clientId',
        },
      });
    }
  }
  client.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    basedAt: DataTypes.STRING,
    phoneNo: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'client',
  });
  return client;
};
