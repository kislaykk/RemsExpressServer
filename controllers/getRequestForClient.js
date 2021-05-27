const db = require('../models/index');

const getRequestForClient = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.request.getRequestForClient(req.userId);
    res.status(200).json({
      success: true,
      request: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRequestForClient;
