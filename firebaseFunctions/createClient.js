const firebase = require('./connection');

const createClient = (email, password) => new Promise((resolve, reject) => {
  firebase.default.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      resolve(user);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = createClient;
