const express = require('express');

const route = express.Router();

const productController = require('../controllers/product.controller');
const validateName = require('../middlewares/name');

route.get('/', productController.getProduct);

route.get('/:id', productController.getProductById);

route.post('/', validateName, productController.insertProduct);

route.put('/:id', validateName, productController.updateProduct);

route.delete('/:id', productController.deleteProduct);

module.exports = route;