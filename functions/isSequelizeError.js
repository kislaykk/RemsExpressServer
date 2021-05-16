const isSequelizeError = (err) => {
  if (err.message.includes('sequelizeError:')) return true;
  return false;
};

module.exports = isSequelizeError;
