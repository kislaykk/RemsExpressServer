/* this program gives the ccess token and refresh token to proceed with further operation */

const db = require('../models/index');

const signInClient = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken } = await db.sequelize.models.client.signIn(email, password);
    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (err.message === 'No user found') {
      res.status(200).json({
        success: false,
        message: 'You are not registered.',
      });
    } else if (err.message === 'UNAUTHORIZED') {
      res.status(401).json({
        success: false,
        message: 'UNAUTHORIZED',
      });
    } else {
      next(err);
    }
  }
};

module.exports = signInClient;
