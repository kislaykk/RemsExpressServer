/* The use of this program is to register the client in firebase auth and database */

const db = require('../models/index');
const createClient = require('../firebaseFunctions/createClient');

const registerClient = async (req, res, next) => {
  const {
    email, name, basedAt, phoneNo, password,
  } = req.body;
  try {
    const { user } = await createClient(email, password);
    // eslint-disable-next-line max-len
    await db.sequelize.models.client.storeInDb(email, name, basedAt, phoneNo, password, user.uid);
    res.status(200).json({
      errorCode: 0,
      success: true,
      message: 'registered',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerClient;
