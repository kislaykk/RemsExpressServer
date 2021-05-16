const express = require('express');
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const registerClient = require('../controllers/registerClient');

const router = express.Router();

router.post('/register', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().trim().min(3).max(25)
      .required(),
    basedAt: Joi.string().trim(),
    phoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().trim().min(8).max(20)
      .required(),
  }),
}), registerClient);

router.post('/signIn', (req, res, next) => {
  res.status(200).json({
    message: 'signedIn',
  });
  next();
});

router.get('/resetPassword', (req, res, next) => {
  res.status(200).json({
    message: `password reset for ${req.query.email}`,
  });
  next();
});

module.exports = router;
