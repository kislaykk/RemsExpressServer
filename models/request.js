/* eslint-disable no-unused-vars */
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
        return sequelize.models.tenant.findOne({
          where: {
            leasedById: clientId,
            propertyId,
          },
        });
      })
      .then((val) => {
        if (val) throw new Error('sequelizeError:it is already rented to you');
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
  request.acceptRequest = (clientId, { id, propertyId }) => new Promise((resolve, reject) => {
    let reques;
    request.findOne({
      where: {
        id,
        propertyId,
      },
    })
      .then((value) => {
        if (!value) reject(new Error('sequelizeError:request does not exist'));
        reques = value;
        return sequelize.models.property.findByPk(propertyId);
      })
      .then((property) => {
        if (!property) reject(new Error('sequelizeError:property does not exist'));
        return property.getClient();
      })
      .then((client) => {
        if (client.id !== clientId) reject(new Error('FORBIDDEN'));
        return sequelize.models.tenant.create({ propertyId, leasedById: reques.clientId });
      })
      .then((val) => sequelize.models.request.destroy({
        where: {
          id,
        },
      }))
      .then((val) => {
        resolve(val);
      })
      .catch((error) => { reject(error); });
  });
  request.rejectRequest = (clientId, { id }) => new Promise((resolve, reject) => {
    request.findOne({
      where: {
        id,
      },
    })
      .then((value) => {
        if (!value) reject(new Error('sequelizeError:request does not exist'));
        return sequelize.models.property.findByPk(value.propertyId);
      })
      .then((property) => {
        if (!property) reject(new Error('sequelizeError:property does not exist'));
        return property.getClient();
      })
      .then((client) => {
        if (client.id !== clientId) reject(new Error('FORBIDDEN'));
        return sequelize.models.request.destroy({
          where: {
            id,
          },
        });
      })
      .then((val) => {
        resolve(val);
      })
      .catch((error) => { reject(error); });
  });
  return request;
};
