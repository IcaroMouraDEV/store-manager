const { productNameSchema } = require('./schema');

const validateProductNameLenght = (name) => {
  const { error } = productNameSchema.validate({ name });

  if (error) return { type: 'error', message: error.message };
};

module.exports = {
  validateProductNameLenght,
};