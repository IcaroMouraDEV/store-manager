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
  { sale_id: 1, product_id: 1, quantity: 5 },
  { sale_id: 1, product_id: 2, quantity: 10 },
  { sale_id: 2, product_id: 3, quantity: 15 },
  { sale_id: 3, product_id: 1, quantity: 1 },
  { sale_id: 3, product_id: 2, quantity: 5 },
];

const saleProductById = [
  { date: '2022-10-15T22:41:35.000Z', productId: 1, quantity: 5 },
  { date: '2022-10-15T22:41:35.000Z', productId: 2, quantity: 10 }
]

const allSaleProduct = [
  {
    sale_id: 1,
    product_id: 1,
    quantity: 5,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    sale_id: 1,
    product_id: 2,
    quantity: 10,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    sale_id: 2,
    product_id: 3,
    quantity: 15,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    sale_id: 3,
    product_id: 1,
    quantity: 1,
    date: '2022-10-15T22:41:35.000Z'
  },
  {
    sale_id: 3,
    product_id: 2,
    quantity: 5,
    date: '2022-10-15T22:41:35.000Z'
  }
]

module.exports = {
  insertSaleProductResult,
  saleProduct,
  sales,
  salesProduct,
  allSaleProduct,
  saleProductById,
}