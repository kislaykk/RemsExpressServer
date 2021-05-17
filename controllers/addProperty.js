const db = require('../models/index');

const addProperty = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const result = await db.sequelize.models.property.addProperty(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'property added',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addProperty;
