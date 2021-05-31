const express = require('express');
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const decodeJWT = require('../controllers/decodeJWT');
const getExpenditure = require('../controllers/getExpenditure');
const addExpenditure = require('../controllers/addExpenditure');
const deleteExpenditure = require('../controllers/deleteExpenditure');
const getTotalExpenseAndIncome = require('../controllers/getAllExpenditure');

const router = express.Router();

router.get('/expInc', decodeJWT, getTotalExpenseAndIncome);

router.get('/:propertyId', decodeJWT, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    propertyId: Joi.number().integer().min(1).required(),
  }),
}), getExpenditure);

router.post('/', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    propertyId: Joi.number().integer().min(1).required(),
    cost: Joi.number().integer().required(),
    note: Joi.string().trim().min(10).required(),
    date: Joi.date().iso().required(),
  }),
}), addExpenditure);

router.delete('/', decodeJWT, celebrate({
  [Segments.BODY]: Joi.object().keys({
    propertyId: Joi.number().integer().min(1).required(),
    id: Joi.number().integer().min(1).required(),
  }),
}), deleteExpenditure);

module.exports = router;
