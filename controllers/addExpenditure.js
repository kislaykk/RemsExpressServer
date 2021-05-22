/* eslint-disable max-len */
const db = require('../models/index');

const addExpenditure = async (req, res, next) => {
  try {
    const property = await db.sequelize.models.property.findByPk(req.body.propertyId);
    if (!property) throw new Error('sequelizeError:Property does not exist');
    else if (property.clientId !== req.userId) throw new Error('FORBIDDEN');
    else {
      const exp = await db.sequelize.models.expenditure.create({
        cost: req.body.cost,
        notes: {
          details: req.body.note,
          date: req.body.date,
        },
      });
      await property.addExpenditure(exp);
      res.status(200).json({
        success: true,
        expenditures: 'tansaction added',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = addExpenditure;
