const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO StoreManager.products (name) VALUE ()`);

  return insertId;
};

const insertSaleProduct = async ({ productId, quantity }, saleId) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  console.log(result);
  return result;
};

module.exports = {
  insertSale,
  insertSaleProduct,
};
