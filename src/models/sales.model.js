const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUE ()',
  );

  return insertId;
};

const insertSaleProduct = async ({ productId, quantity }, saleId) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return result;
};

module.exports = {
  insertSale,
  insertSaleProduct,
};
