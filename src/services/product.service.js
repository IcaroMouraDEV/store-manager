const { productModel } = require('../models');

const findAllProduct = async () => {
  const result = await productModel.findAll();

  return { type: null, message: result };
};

const findProductById = async (id) => {
  const result = await productModel.findById(Number(id));

  if (!result) return { type: 'error', message: 'Product not found' };
  console.log(result);

  return { type: null, message: result };
};

module.exports = {
  findAllProduct,
  findProductById,
};
