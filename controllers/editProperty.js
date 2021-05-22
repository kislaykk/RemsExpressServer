const db = require('../models/index');

const editProperty = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const result = await db.sequelize.models.property.editProperty(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'property edit successfull',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = editProperty;
