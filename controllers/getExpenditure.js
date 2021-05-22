/* eslint-disable max-len */
const db = require('../models/index');

const getExpenditure = async (req, res, next) => {
  try {
    const property = await db.sequelize.models.property.findByPk(req.params.propertyId);
    if (!property) throw new Error('sequelizeError:Property does not exist');
    else if (property.clientId !== req.userId) throw new Error('FORBIDDEN');
    else {
      const exp = await property.getExpenditures();
      res.status(200).json({
        success: true,
        expenditures: exp,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getExpenditure;
