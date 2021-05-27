const db = require('../models/index');

const addRequest = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const result = await db.sequelize.models.request.addRequest(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'request sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addRequest;
