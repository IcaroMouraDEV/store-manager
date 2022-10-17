const { saleService } = require('../services');

const insertProduct = async (req, res) => {
  const sales = req.body;
  const { type, message } = await saleService.createSale(sales);

  const regexRequired = (string) => /is required/.test(string);
  const regexOrder = (string) => /than or equal to 1/.test(string);
  const regexNumber = (string) => /be a number/.test(string);

  if (regexRequired(message)) return res.status(400).json({ message });
  if (regexOrder(message)) return res.status(422).json({ message });
  if (regexNumber(message)) return res.status(422).json({ message });
  if (type === 'not found') return res.status(404).json({ message });

  res.status(201).json(message);
};

const getAllProducts = async (_req, res) => {
  const { message } = await saleService.getAllSales();

  res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getSalesById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const removeSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.removeSale(id);

  if (type) return res.status(404).json({ message });

  res.status(204).json(message);
};

module.exports = {
  insertProduct,
  getAllProducts,
  getProductsById,
  removeSaleById,
};