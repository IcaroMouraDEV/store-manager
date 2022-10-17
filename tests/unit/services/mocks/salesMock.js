const insertSaleProductResult = [
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

const saleProduct = {
  type: null,
  message: {
    id: 1,
    itemsSold: [
      {
        productId: 3,
        quantity: 2
      }
    ]
  }
}

const sales = [
  { id: 1, date: '2022-10-15T22:41:35.000Z' },
  { id: 2, date: '2022-10-15T22:41:35.000Z' },
  { id: 3, date: '2022-10-15T22:41:35.000Z' },
];

const salesProduct = [
  { saleId: 1, productId: 1, quantity: 5 },
  { saleId: 1, productId: 2, quantity: 10 },
  { saleId: 2, productId: 3, quantity: 15 },
  { saleId: 3, productId: 1, quantity: 1 },
  { saleId: 3, productId: 2, quantity: 5 },
];

const saleProductById = [
  { date: '2022-10-15T22:41:35.000Z', productId: 1, quantity: 5 },
  { date: '2022-10-15T22:41:35.000Z', productId: 2, quantity: 10 }
]

const allSaleProduct = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    saleId: 3,
    productId: 1,
    quantity: 1,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    saleId: 3,
    productId: 2,
    quantity: 5,
    date: '2022-10-15T22:41:35.000Z'
  }
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

module.exports = {
  insertSaleProductResult,
  saleProduct,
  sales,
  salesProduct,
  allSaleProduct,
  saleProductById,
  deleteReturn,
}