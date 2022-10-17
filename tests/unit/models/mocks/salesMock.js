const insertedSaleProduct = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const sales = [
  { id: 1, date: '2022-10-15T22:41:35.000Z' },
  { id: 2, date: '2022-10-15T22:41:35.000Z' },
  { id: 3, date: '2022-10-15T22:41:35.000Z' },
];

const salesProduct = [
  { sale_id: 1, product_id: 1, quantity: 5 },
  { sale_id: 1, product_id: 2, quantity: 10 },
  { sale_id: 2, product_id: 3, quantity: 15 },
  { sale_id: 3, product_id: 1, quantity: 1 },
  { sale_id: 3, product_id: 2, quantity: 5 },
];

const deleteReturn = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

const updateResult = [
  {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 0,
    info: 'Rows matched: 2  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  },
  undefined
]

module.exports = {
  insertedSaleProduct,
  sales,
  salesProduct,
  deleteReturn,
  updateResult,
}