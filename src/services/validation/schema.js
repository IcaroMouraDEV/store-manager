const Joi = require('joi');

const productNameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const productSaleSchema = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  productNameSchema,
  productSaleSchema,
};
