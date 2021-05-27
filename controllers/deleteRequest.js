/* eslint-disable no-unused-vars */
const db = require('../models/index');

const deleteRequest = async (req, res, next) => {
  try {
    const response = await db.sequelize.models.request.deleteRequest(req.userId, req.body);
    res.status(200).json({
      success: true,
      message: 'request removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteRequest;
