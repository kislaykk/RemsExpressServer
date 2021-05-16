const express = require('express');

const app = express();
const dotenv = require('dotenv');
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on:${PORT}`);
});
