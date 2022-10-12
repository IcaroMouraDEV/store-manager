const { productService } = require('../services');

const getProduct = async (_req, res) => {
  const { message } = await productService.findAllProduct();

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findProductById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(422).json({ message });

  res.status(201).json(message);
};

module.exports = {
  getProduct,
  getProductById,
  insertProduct,
};
