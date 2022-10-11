const express = require('express');

const route = express.Router();

const productController = require('../controllers/product.controller');

route.get('/', productController.getProduct);

route.get('/:id', productController.getProductById);

module.exports = route;