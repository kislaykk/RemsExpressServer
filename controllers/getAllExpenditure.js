const db = require('../models/index');

const getTotalExpenseAndIncome = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.expenditure.getTotalExpenseAndIncome(req.userId);
    res.status(200).json({
      success: true,
      exp: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getTotalExpenseAndIncome;
