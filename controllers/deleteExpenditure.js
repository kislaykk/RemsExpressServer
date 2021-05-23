/* eslint-disable max-len */
const db = require('../models/index');

const deleteExpenditure = async (req, res, next) => {
  try {
    const property = await db.sequelize.models.property.findByPk(req.body.propertyId);
    const exp = await db.sequelize.models.expenditure.findByPk(req.body.id);
    if (!property) throw new Error('sequelizeError:Property does not exist');
    else if (property.clientId !== req.userId) throw new Error('FORBIDDEN');
    else if (!exp) throw new Error('sequelizeError:expenditure does not exist');
    else if (exp.propertyId !== req.body.propertyId) throw new Error('sequelizeError:doesnot belongs to this property');
    else {
      await exp.destroy();
      res.status(200).json({
        success: true,
        message: 'record deleted',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteExpenditure;
