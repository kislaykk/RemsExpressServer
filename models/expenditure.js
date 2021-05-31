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
    propertyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'expenditure',
  });
  expenditure.getTotalExpenseAndIncome = (clientId) => new Promise((resolve, reject) => {
    sequelize.models.property.findAll({ where: { clientId } })
      .then((value) => {
        if (value.length === 0) {
          resolve({
            expenditure: 0,
            income: 0,
          });
        } else {
          const propertyIdArray = [];
          value.forEach((val) => {
            propertyIdArray.push(val.id);
          });
          return expenditure.findAll({
            where: {
              propertyId: propertyIdArray,
            },
          });
        }
      })
      .then((expenses) => {
        if (expenses.length === 0) {
          resolve({
            expenditure: 0,
            income: 0,
          });
        } else {
          let exp = 0;
          let inc = 0;
          expenses.forEach((expense) => {
            if (expense.cost > 0)inc += expense.cost;
            else exp += expense.cost;
          });
          resolve({
            expenditure: exp,
            income: inc,
          });
        }
      })
      .catch((error) => reject(error));
  });
  return expenditure;
};
