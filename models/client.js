const {
  Model,
} = require('sequelize');

const bcrypt = require('bcrypt');
const generateRandomString = require('../functions/generateRandomString');

module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      client.hasOne(models.property, {
        foreignKey: {
          name: 'clientId',
        },
      });
    }
  }
  client.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    basedAt: DataTypes.STRING,
    phoneNo: DataTypes.NUMBER,
    secret: DataTypes.STRING,
    password: DataTypes.STRING,
    uid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'client',
  });
  // eslint-disable-next-line max-len
  client.storeInDb = (email, name, basedAt, phoneNo, password, uid) => new Promise((resolve, reject) => {
    bcrypt.hash(password, process.env.SALT_ROUND, (err1, encrypted) => {
      if (err1) reject(err1);
      client.create({
        email,
        name,
        basedAt,
        phoneNo,
        secret: generateRandomString(),
        password: encrypted,
        uid,
      })
        .then(() => {
          resolve();
        })
        .catch((err2) => {
          reject(err2);
        });
    });
  });

  return client;
};
