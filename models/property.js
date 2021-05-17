const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      property.belongsTo(models.client, {
        foreignKey: {
          name: 'clientId',
          onDelete: 'CASCADE',
        },
      });
      property.hasOne(models.tenant, {
        foreignKey: {
          name: 'propertyId',
        },
      });
    }
  }
  property.init({
    name: DataTypes.STRING,
    address: DataTypes.JSON,
    toSell: DataTypes.BOOLEAN,
    toLease: DataTypes.BOOLEAN,
    cost: DataTypes.NUMBER,
    clientId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'property',
  });

  property.addProperty = (clientId, {
    name, street, locality, city, state, pin,
  }) => new Promise((resolve, reject) => {
    const address = {
      street, city, locality, state, pin,
    };
    property.create({
      name,
      address,
      clientId,
    }).then((val) => {
      resolve(val);
    })
      .catch((err) => {
        reject(err);
      });
  });
  return property;
};
