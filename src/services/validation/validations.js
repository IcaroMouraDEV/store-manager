const { productNameSchema, productSaleSchema } = require('./schema');

const validateProductNameLenght = (name) => {
  const { error } = productNameSchema.validate({ name });

  if (error) return { type: 'error', message: error.message };

  return { type: null, message: '' };
};

const validateSaleObject = (sales) => {
  const validation = sales.map((sale) => {
    const { error } = productSaleSchema.validate(sale);

    if (error) return { type: 'error', message: error.message };
    return { type: null, message: '' };
  }).filter((sale) => sale.message !== '');

  return validation.length > 0 ? validation[0] : null;
};

module.exports = {
  validateProductNameLenght,
  validateSaleObject,
};