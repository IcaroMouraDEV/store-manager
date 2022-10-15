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

module.exports = {
  insertProduct,
};