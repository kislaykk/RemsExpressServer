const db = require('../models/index');

const getAllProperty = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.property.getAllProperty(req.userId);
    res.status(200).json({
      success: true,
      property: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllProperty;
