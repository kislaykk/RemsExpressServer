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
  tenant.removeTenant = (userId, { propertyId, leasedById }) => new Promise((resolve, reject) => {
    tenant.findOne({
      where: {
        propertyId,
        leasedById,
      },
    })
      .then((value) => {
        if (!value) reject(new Error('sequelizeError:No such tenant exists'));
        return sequelize.models.property.findByPk(propertyId);
      })
      .then((property) => property.getClient())
      .then((client) => {
        if (client.id !== userId) reject(new Error('FORBIDDEN'));
        return tenant.destroy({
          where: {
            propertyId,
            leasedById,
          },
        });
      })
      .then((val) => {
        resolve(val);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return tenant;
};
