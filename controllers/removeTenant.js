/* eslint-disable no-unused-vars */
const db = require('../models/index');

const removeTenant = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.tenant.removeTenant(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'tenant removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeTenant;
