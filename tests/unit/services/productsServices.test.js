const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services')
const { products } = require('./mocks/productMock');

describe('Testes de unidade do Service de produtos', function () {
  afterEach(sinon.restore);

  describe('Testando o endpoint get de products', function () {
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

  describe('testando o endpoint post do products', function () {
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
      expect(result.message).to.equal('"value" length must be at least 5 characters long');
    });
  })
});
