const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services')
const { products, productUpdated, updatedProduct, productDeleted } = require('./mocks/productMock');

describe('Testes de unidade do Service de produtos', function () {
  afterEach(sinon.restore);
  //teste
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

  it('Cadastrando com inputs validos', async function () {
    sinon.stub(productModel, 'insert').resolves([{ insertId: 1 }]);
    sinon.stub(productModel, 'findById').resolves(products[0]);
    
    const result = await productService.createProduct('Martelo de Thor');

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products[0]);
  });

  it('Cadastrando com inputs invalidos', async function () {
    sinon.stub(productModel, 'insert').resolves([{ insertId: 1 }]);
    sinon.stub(productModel, 'findById').resolves(null);
    
    const result = await productService.createProduct('nada');

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('Atualizando com inputs validos', async function () {
    sinon.stub(productModel, 'updateById').resolves(productUpdated);
    sinon.stub(productModel, 'findById').resolves(updatedProduct);
    
    const result = await productService.updateProduct(1, 'Batmovel');

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(updatedProduct);
  });

  it('Atualizando com id invalido', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    sinon.stub(productModel, 'updateById').resolves(null);
    
    const result = await productService.updateProduct(4, 'Batmovel');

    expect(result.type).to.equal('not found');
    expect(result.message).to.be.deep.equal('Product not found');
  });

  it('Atualizando com name invalido', async function () {
    sinon.stub(productModel, 'findById').resolves(productUpdated);
    sinon.stub(productModel, 'updateById').resolves(null);
    
    const result = await productService.updateProduct(1, 'nada');

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('Deletando com input valido', async function () {
    sinon.stub(productModel, 'findById').resolves(products[0]);
    sinon.stub(productModel, 'deleteById').resolves(productDeleted);
    
    const result = await productService.deleteProduct(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal([]);
  });

  it('Deletando com input invalido', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    sinon.stub(productModel, 'deleteById').resolves(null);
    
    const result = await productService.deleteProduct(111);

    expect(result.type).to.equal('not found');
    expect(result.message).to.deep.equal('Product not found');
  });
});
