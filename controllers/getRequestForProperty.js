const db = require('../models/index');

const getRequestForProperty = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.request.getRequestForProperty(req.body.propertyId);
    res.status(200).json({
      success: true,
      request: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRequestForProperty;
