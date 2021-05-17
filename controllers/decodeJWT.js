const jwt = require('jsonwebtoken');
const db = require('../models/index');

const decodeJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) next(new Error('FORBIDDEN'));
    else if (!authorization.includes('Bearer ')) next(new Error('FORBIDDEN'));
    else {
      const token = authorization.split(' ')[1];
      const decoded = jwt.decode(token);
      if (!decoded || !decoded.userId || !decoded.type === 'access_token') next(new Error('FORBIDDEN'));
      else {
        const secret = await db.sequelize.models.client.getClientSecret(decoded.userId);
        // eslint-disable-next-line no-unused-vars
        jwt.verify(token, secret, (err, decodedResult) => {
          if (!err) {
            req.userId = decoded.userId;
            next();
          } else {
            next(new Error('FORBIDDEN'));
          }
        });
      }
    }
  } catch (err) { next(err); }
};

module.exports = decodeJWT;
