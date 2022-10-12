const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products, productInserted, newProduct } = require('./mocks/productMock');

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Inserindo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productModel.insert(newProduct);
    expect(result).to.equal(4);
  });
});
