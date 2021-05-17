const express = require('express');
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const decodeJWT = require('../controllers/decodeJWT');
const addProperty = require('../controllers/addProperty');

const router = express.Router();

router.post('/add', decodeJWT, celebrate({

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().trim().min(3).max(25)
      .required(),
    street: Joi.string().trim().min(3).max(25)
      .required(),
    locality: Joi.string().trim().min(3).max(25)
      .required(),
    city: Joi.string().trim().min(3).max(25)
      .required(),
    state: Joi.string().trim().min(3).max(25)
      .required(),
    pin: Joi.number().integer().required(),
  }),
}),
addProperty);

module.exports = router;
