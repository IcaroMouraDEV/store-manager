const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { insertedSaleProduct } = require('./mocks/salesMock');

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
})