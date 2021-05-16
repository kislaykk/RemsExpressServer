const firebase = require('./connection');

const createClient = (email, password) => new Promise((resolve, reject) => {
  firebase.default.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = createClient;
