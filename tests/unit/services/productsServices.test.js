const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services')
const { products } = require('./mocks/productMock');

describe('Testes de unidade do Service de produtos', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(products);
    const result = await productService.findAllProduct();
    
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products);
  });

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);
    const result = await productService.findProductById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products[0]);
  });

  it('Recuperando a lista de produtos com id inexistente', async function () {
    sinon.stub(productModel, 'findById').resolves(products[4]);
    const result = await productService.findProductById(4);

    expect(result.type).to.equal('error');
    expect(result.message).to.be.deep.equal('Product not found');
  });
});
