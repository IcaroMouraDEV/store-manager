const { productService } = require('../services');

const getProduct = async (_req, res) => {
  const { message } = await productService.findAllProduct();

  res.status(200).json(message);
};

const getProductByQuery = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.findAllProduct();
  const items = message.filter((item) => item.name.includes(q));

  res.status(200).json(items);
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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProduct(id, name);
  
  if (type === 'error') return res.status(422).json({ message });
  if (type === 'not found') return res.status(404).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);
  
  if (type) return res.status(404).json({ message });

  res.status(204).json(message);
};

module.exports = {
  getProduct,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
};
