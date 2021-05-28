const db = require('../models/index');

const getTenants = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.property.getTenantsFromDb(req.userId, req.body);
    res.status(200).json({
      success: true,
      tenants: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getTenants;
