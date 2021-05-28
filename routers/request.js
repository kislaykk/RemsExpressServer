const express = require('express');
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const decodeJWT = require('../controllers/decodeJWT');
const addRequest = require('../controllers/addRequest');
const getRequestForProperty = require('../controllers/getRequestForProperty');
const getRequestForClient = require('../controllers/getRequestForClient');
const deleteRequest = require('../controllers/deleteRequest');
const acceptRequest = require('../controllers/acceptRequest');
const rejectRequest = require('../controllers/rejectRequest');

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

router.post('/accept', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    propertyId: Joi.number().integer().positive().required(),
  }),
}),
acceptRequest);

router.delete('/reject', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
  }),
}),
rejectRequest);

module.exports = router;
