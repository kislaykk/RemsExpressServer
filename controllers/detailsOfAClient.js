/* eslint-disable max-len */
const db = require('../models/index');

const detailsOfAClient = async (req, res, next) => {
  try {
    const details = await db.sequelize.models.client.detailsOfAClient(req.body);

    res.status(200).json({
      success: true,
      details,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = detailsOfAClient;
