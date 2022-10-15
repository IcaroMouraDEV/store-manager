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

const findAllSale = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );

  return result;
};

const findAllSaleProduct = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );

  return result;
};

const findSaleById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return result;
};

const findSaleProductsById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  return result;
};

module.exports = {
  insertSale,
  insertSaleProduct,
  findSaleById,
  findSaleProductsById,
  findAllSale,
  findAllSaleProduct,
};
