const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { saleProduct, insertSaleProductResult } = require('./mocks/salesMock');

describe('Testes de unidade do Service de sales', function () {
  afterEach(sinon.restore);
  
  describe('inserindo com valores invalidos', async function () {
    it('inserindo com id sendo string', async function () {
      const result = await saleService.createSale([{ productId: '', quantity: 2 }]);

      expect(result.type).to.equal('error');
      expect(result.message).to.equal('"productId" must be a number');
    })
  
    it('inserindo com id sendo undefined', async function () {
      const result = await saleService.createSale([{ productId: undefined, quantity: 1 }]);

      expect(result.type).to.equal('error');
      expect(result.message).to.equal('"productId" is required');
    })

    it('inserindo com id sendo 0', async function () {
      const result = await saleService.createSale([{ productId: 0, quantity: 1 }]);

      expect(result.type).to.equal('error');
      expect(result.message).to.equal('"productId" must be greater than or equal to 1');
    })

    it('inserindo com id inexistente', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await saleService.createSale([{ productId: 999, quantity: 1 }]);

      console.log(result);
      expect(result.type).to.equal('not found');
      expect(result.message).to.equal('Product not found');
    })

    it('inserindo com quantity sendo string', async function () {
      const result = await saleService.createSale([{ productId: 3, quantity: '' }]);

      expect(result.type).to.equal('error');
      expect(result.message).to.equal('"quantity" must be a number');
    })

    it('inserindo com quantity sendo undefined', async function () {
      const result = await saleService.createSale([{ productId: 3, quantity: undefined }]);

      expect(result.type).to.equal('error');
      expect(result.message).to.equal('"quantity" is required');
    })

    it('inserindo com quantity sendo 0', async function () {
      const result = await saleService.createSale([{ productId: 3, quantity: 0 }]);

      expect(result.type).to.equal('error');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    })
  });

  it('inserindo com valores validos', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProduct').resolves(insertSaleProductResult);

    const result = await saleService.createSale([{ productId: 3, quantity: 2 }]);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(saleProduct.message);
  })
});