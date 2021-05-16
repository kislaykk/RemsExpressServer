const randomstring = require('randomstring');

const generateRandomString = () => {
  const randomString = randomstring.generate(process.env.RANDOM_STRING_LENGTH);
  return randomString;
};

module.exports = generateRandomString;
