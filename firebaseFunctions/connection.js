const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfig.json');

firebase.default.initializeApp(firebaseConfig);
module.exports = firebase;
