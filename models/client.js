const {
  Model,
} = require('sequelize');

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const generateRandomString = require('../functions/generateRandomString');

dotenv.config();

module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      client.hasMany(models.property, {
        foreignKey: {
          name: 'clientId',
        },
      });
      client.hasMany(models.request, {
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
    phoneNo: DataTypes.BIGINT,
    secret: DataTypes.STRING,
    password: DataTypes.STRING,
    uid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'client',
  });

  client.getClientSecret = (id) => new Promise((resolve, reject) => {
    client.findByPk(id)
      .then((val) => {
        if (!val) reject(new Error('FORBIDDEN'));
        resolve(val.secret);
      })
      .catch((err) => {
        reject(err);
      });
  });
  client.checkIfPhoneNoExists = (phoneNo) => new Promise((resolve, reject) => {
    client.findOne({ where: { phoneNo } })
      .then((val) => {
        if (val) reject(new Error('sequelizeError:PhoneNo already exists'));
        else resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  // eslint-disable-next-line max-len
  client.storeInDb = (email, name, basedAt, phoneNo, password, uid) => new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err1, encrypted) => {
      if (err1) reject(err1);
      client.findOne({ where: { email } })
        .then((val) => {
          if (val) reject(new Error('sequelizeError:Email already exists'));
        });
      client.findOne({ where: { phoneNo } })
        .then((val) => {
          if (val) reject(new Error('sequelizeError:PhoneNo already exists'));
        });
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
  client.detailsOfAClient = ({ id }) => new Promise((resolve, reject) => {
    client.findByPk(id)
      .then((val) => {
        if (!val) reject(new Error('No user found'));
        else {
          resolve({
            name: val.name,
            email: val.email,
            phoneNo: val.phoneNo,
            basedAt: val.basedAt,
          });
        }
      })
      .catch((err) => { reject(err); });
  });
  client.signIn = (email, password) => new Promise((resolve, reject) => {
    client.findOne({ where: { email } })
      .then((val) => {
        if (!val) reject(new Error('No user found'));
        else {
          bcrypt.compare(password, val.password, (err, result) => {
            if (!result || err) {
              reject(new Error('UNAUTHORIZED'));
            } else {
              const accessToken = jwt.sign({ userId: val.id, type: 'access_token' }, val.secret, { expiresIn: '1h' });
              const refreshToken = jwt.sign({ userId: val.id, type: 'refresh_token' }, val.secret, { expiresIn: '1d' });
              resolve({
                accessToken, refreshToken,
              });
            }
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
  return client;
};
