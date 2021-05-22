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
  property.getProperty = (clientId) => new Promise((resolve, reject) => {
    property.findAll({ where: { clientId } })
      .then((values) => {
        resolve(values);
      })
      .catch((err) => {
        reject(err);
      });
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
  property.deleteProperty = (clientId, { id }) => new Promise((resolve, reject) => {
    property.findByPk(id)
      .then(async (instance) => {
        if (!instance) reject(new Error('sequelizeError:Property does not exist'));
        else if (instance.clientId !== clientId) reject(new Error('FORBIDDEN'));
        else {
          await instance.destroy();
          resolve();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

  property.editProperty = (clientId, {
    name, street, locality, city, state, pin, id,
  }) => new Promise((resolve, reject) => {
    property.findByPk(id)
      .then(async (instance) => {
        if (!instance) reject(new Error('sequelizeError:Property does not exist'));
        else if (instance.clientId !== clientId) reject(new Error('FORBIDDEN'));
        else {
          await instance.update({
            name,
            address: {
              street, locality, city, state, pin,
            },
          });
          resolve();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
  return property;
};
