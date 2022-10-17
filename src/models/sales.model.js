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
    `
    SELECT * FROM StoreManager.sales_products
    ORDER BY sale_id ASC, product_id ASC
    `,
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
    `
    SELECT * FROM StoreManager.sales_products WHERE sale_id = ?
    ORDER BY sale_id ASC, product_id ASC
    `,
    [id],
  );

  return result;
};

const removeSale = async (id) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return result;
};

const updateSaleProduct = async ({ productId, quantity }, saleId) => {
  const result = await connection.execute(
    `
    UPDATE StoreManager.sales_products SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?
    `,
    [productId, quantity, saleId, productId],
  );

  return result;
};

updateSaleProduct({ productId: 1, quantity: 2 }, 1);

module.exports = {
  insertSale,
  insertSaleProduct,
  findSaleById,
  findSaleProductsById,
  findAllSale,
  findAllSaleProduct,
  removeSale,
  updateSaleProduct,
};
