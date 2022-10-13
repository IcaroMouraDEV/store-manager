const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products, productInserted, newProduct, productUpdated, productDeleted } = require('./mocks/productMock');

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

  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves(productUpdated);
    const result = await productModel.updateById(1, 'Batmovel');
    
    expect(result[0].affectedRows).to.be.deep.equal(1);
    expect(result[0].changedRows).to.be.deep.equal(1);
  });

  it('Deletando um produto', async function () {
    sinon.stub(connection, 'execute').resolves(productDeleted);
    const result = await productModel.deleteById(1);
    
    expect(result[0].affectedRows).to.be.deep.equal(0);
  });
});
