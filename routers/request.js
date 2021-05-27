const express = require('express');
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const decodeJWT = require('../controllers/decodeJWT');
const addRequest = require('../controllers/addRequest');
const getRequestForProperty = require('../controllers/getRequestForProperty');
const getRequestForClient = require('../controllers/getRequestForClient');
const deleteRequest = require('../controllers/deleteRequest');

const router = express.Router();

router.post('/', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    propertyId: Joi.number().integer().positive().required(),
    requestType: Joi.number().integer().positive().valid(1, 2)
      .required(),
  }),
}),
addRequest);

router.post('/get', celebrate({
  [Segments.BODY]: Joi.object().keys({
    propertyId: Joi.number().integer().positive().required(),
  }),
}), getRequestForProperty);

router.get('/get', decodeJWT, getRequestForClient);

router.delete('/', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
  }),
}),
deleteRequest);

module.exports = router;
