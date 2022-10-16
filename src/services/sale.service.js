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

const getAllSales = async () => {
  const sales = await salesModel.findAllSale();
  const salesProduct = await salesModel.findAllSaleProduct();

  const message = salesProduct.map((sale) => {
    const { date } = sales.find((item) => item.id === sale.sale_id);
    return {
      ...sale,
      date,
    };
  });
  
  return { type: null, message };
};

const getSalesById = async (id) => {
  const sales = await salesModel.findSaleById(id);

  if (!sales) return { type: 'not found', message: 'Sale not found' };

  const salesProduct = await salesModel.findSaleProductsById(id);
  const message = salesProduct.map((sale) => ({
    date: sales.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return { type: null, message };
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
};