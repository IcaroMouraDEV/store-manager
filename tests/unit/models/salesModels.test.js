const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { insertedSaleProduct, sales, salesProduct, deleteReturn } = require('./mocks/salesMock');

describe('teste de unidade de Sales Model', function () {
  afterEach(sinon.restore)

  it('inserindo Sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModel.insertSale();

    expect(result).to.equal(1);
  })

  it('inserindo Sale Product', async function () {
    sinon.stub(connection, 'execute').resolves(insertedSaleProduct)

    const result = await salesModel.insertSaleProduct({ productId: 1, quantity: 1 }, 1);

    expect(result[0].affectedRows).to.deep.equal(1);
  })

  it('Recuperando todas as Sale', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.findAllSale();

    expect(result).to.deep.equal(sales);
  })

  it('Recuperando a Sale pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[sales[0]]]);

    const result = await salesModel.findSaleById(1);

    expect(result).to.deep.equal(sales[0]);
  })

  it('Recuperando todas as Sale Product', async function () {
    sinon.stub(connection, 'execute').resolves([salesProduct]);

    const result = await salesModel.findAllSaleProduct();

    expect(result).to.deep.equal(salesProduct);
  })

  it('Recuperando a Sale Product pelo id', async function () {
    const salesProductMock = [salesProduct[0], salesProduct[1]];
    sinon.stub(connection, 'execute').resolves([salesProductMock]);

    const result = await salesModel.findSaleProductsById(1);

    expect(result).to.deep.equal(salesProductMock);
  })

  it('Deletando a Sale com o id', async function () {
    sinon.stub(connection, 'execute').resolves(deleteReturn);

    const result = await salesModel.removeSale(1);

    expect(result).to.deep.equal(deleteReturn);
  })
})