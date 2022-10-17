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
};

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

const saleProductById = [
  { date: '2022-10-15T22:41:35.000Z', productId: 1, quantity: 5 },
  { date: '2022-10-15T22:41:35.000Z', productId: 2, quantity: 10 }
]

const saleProductUpdate = {
  type: null,
  message: {
    saleId: 1,
    itemsUpdated: [
      {
        productId: 1,
        quantity: 20
      }
    ]
  }
}

module.exports = {
  saleProduct,
  allSaleProduct,
  saleProductById,
  saleProductUpdate,
}