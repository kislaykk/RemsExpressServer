/* eslint-disable no-unused-vars */
const db = require('../models/index');

const acceptRequest = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.request.acceptRequest(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'request accepted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = acceptRequest;
