const express = require('express');
const salesController = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', salesController.insertProduct);

module.exports = route;