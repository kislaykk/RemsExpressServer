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
  request.addRequest = (clientId, { propertyId, requestType }) => new Promise((resolve, reject) => {
    request.findOne({
      where: {
        propertyId,
        clientId,
        requestType,
      },
    })
      .then((val) => {
        if (val) throw new Error('sequelizeError:already requested');
        return request.create({ clientId, propertyId, requestType });
      })
      .then((val) => {
        resolve(val);
      })
      .catch((err) => {
        reject(err);
      });
  });
  request.getRequestForProperty = (propertyId) => new Promise((resolve, reject) => {
    request.findAll({
      where: {
        propertyId,
      },
    })
      .then((val) => {
        resolve(val);
      })
      .catch((err) => {
        reject(err);
      });
  });
  request.getRequestForClient = (clientId) => new Promise((resolve, reject) => {
    request.findAll({
      where: {
        clientId,
      },
    })
      .then((val) => {
        resolve(val);
      })
      .catch((err) => {
        reject(err);
      });
  });
  request.deleteRequest = (clientId, { id }) => new Promise((resolve, reject) => {
    request.findByPk(id)
      .then((value) => {
        if (!value) throw new Error('sequelizeError:request does not exist');
        if (value.clientId !== clientId) throw new Error('FORBIDDEN');
        return value.destroy();
      })
      .then((res) => resolve(res))
      .catch((error) => { reject(error); });
  });
  return request;
};
