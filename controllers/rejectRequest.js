/* eslint-disable no-unused-vars */
const db = require('../models/index');

const rejectRequest = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.request.rejectRequest(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'request rejected',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = rejectRequest;
