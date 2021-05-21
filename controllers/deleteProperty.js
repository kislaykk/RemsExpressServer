const db = require('../models/index');

const deleteProperty = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const result = await db.sequelize.models.property.deleteProperty(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'property deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProperty;
