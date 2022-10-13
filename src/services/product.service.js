const { productModel } = require('../models');
const { validateProductNameLenght } = require('./validation/validations');

const findAllProduct = async () => {
  const result = await productModel.findAll();

  return { type: null, message: result };
};

const findProductById = async (id) => {
  const result = await productModel.findById(Number(id));

  if (!result) return { type: 'error', message: 'Product not found' };

  return { type: null, message: result };
};

const createProduct = async (name) => {
  const validateResult = validateProductNameLenght(name);

  if (validateResult.type) return validateResult;

  const insertId = await productModel.insert(name);
  const product = await productModel.findById(insertId);

  return { type: null, message: product };
};

const updateProduct = async (id, name) => {
  const validateResult = validateProductNameLenght(name);

  if (validateResult.type) return validateResult;

  const product = await productModel.findById(id);

  if (!product) return { type: 'not found', message: 'Product not found' };

  await productModel.updateById(id, name);

  const updatedProduct = await productModel.findById(id);

  return { type: null, message: updatedProduct };
};

module.exports = {
  findAllProduct,
  findProductById,
  createProduct,
  updateProduct,
};
