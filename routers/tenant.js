const {
  celebrate, Joi, Segments,
} = require('celebrate'); const express = require('express');
const decodeJWT = require('../controllers/decodeJWT');
const removeTenant = require('../controllers/removeTenant');

const router = express.Router();

router.delete('/', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    leasedById: Joi.number().integer().positive().required(),
    propertyId: Joi.number().integer().positive().required(),
  }),
}),
removeTenant);
module.exports = router;
