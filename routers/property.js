const express = require('express');
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const decodeJWT = require('../controllers/decodeJWT');
const addProperty = require('../controllers/addProperty');
const getProperty = require('../controllers/getProperty');
const deleteProperty = require('../controllers/deleteProperty');
const editProperty = require('../controllers/editProperty');
const getAllProperty = require('../controllers/getAllProperty');

const router = express.Router();

router.get('/', decodeJWT, getProperty);
router.get('/all', decodeJWT, getAllProperty);

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

router.delete('/', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
  }),
}),
deleteProperty);

router.put('/', decodeJWT, celebrate({

  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer().required(),
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
}), editProperty);

module.exports = router;
