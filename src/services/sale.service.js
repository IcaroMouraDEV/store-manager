const { salesModel, productModel } = require('../models');
const { validateSaleObject } = require('./validation/validations');

const createSale = async (sales) => {
  const validateResult = validateSaleObject(sales);

  if (validateResult) return validateResult;

  const products = await Promise
    .all(sales.map(async ({ productId }) => productModel.findById(productId)));
  const productIdValidation = products.every((item) => item);

  if (!productIdValidation) return { type: 'not found', message: 'Product not found' };

  const insertId = await salesModel.insertSale();

  await Promise.all(sales.map(async (item) => {
    const product = await salesModel.insertSaleProduct(item, insertId);

    return product;
  }));

  return { type: null, message: { id: insertId, itemsSold: sales } };
};

module.exports = {
  createSale,
};