const express = require('express');
const salesController = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', salesController.insertProduct);

route.get('/', salesController.getAllProducts);

route.get('/:id', salesController.getProductsById);

route.delete('/:id', salesController.removeSaleById);

module.exports = route;