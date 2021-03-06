const express = require('express');

const app = express();
const dotenv = require('dotenv');
const { isCelebrateError } = require('celebrate');
const isSequelizeError = require('./functions/isSequelizeError');
const client = require('./routers/client');

dotenv.config();

const { PORT } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.all('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to rems express server',
  });
});

app.use('/client', client);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // error due to celebrate validation
  if (isCelebrateError(err)) {
    const errorKey = err.details.keys();
    const { message } = err.details.get(errorKey.next().value).details[0];
    res.status(400).json({
      success: false,
      message,
    });
  } else if (isSequelizeError(err)) { // error due to database constraints
    const message = err.message.split(':')[1];
    res.status(400).json({
      success: false,
      message,
    });
  } else if (err.code === 'auth/email-already-in-use') {
    res.status(400).json({
      success: false,
      message: 'Email is already registered',
    });
  } else if (err.code === 'auth/invalid-email') {
    res.status(400).json({
      success: false,
      message: 'Email is invalid',
    });
  } else if (err.code === 'auth/weak-password') {
    res.status(400).json({
      success: false,
      message: 'using a weak password',
    });
  } else {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on:${PORT}`);
});
