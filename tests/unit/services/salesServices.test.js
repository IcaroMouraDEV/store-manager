const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { updateResult } = require('../models/mocks/salesMock');
const { saleProduct, insertSaleProductResult, sales, salesProduct, allSaleProduct, saleProductById, deleteReturn, saleProductUpdate } = require('./mocks/salesMock');

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

  it('recuperando todas as sales', async function () {
    sinon.stub(salesModel, 'findAllSale').resolves(sales);
    sinon.stub(salesModel, 'findAllSaleProduct').resolves(salesProduct);

    const result = await saleService.getAllSales();

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allSaleProduct);
  });

  it('recuperando as sales com id 1', async function () {
    const salesWithId1 = [salesProduct[0], salesProduct[1]];
    sinon.stub(salesModel, 'findSaleById').resolves(sales[0]);
    sinon.stub(salesModel, 'findSaleProductsById').resolves(salesWithId1);

    const result = await saleService.getSalesById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(saleProductById);
  });

  it('recuperando as sales com id inexistente', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves(undefined);

    const result = await saleService.getSalesById(1);

    expect(result.type).to.equal('not found');
    expect(result.message).to.deep.equal('Sale not found');
  });

  it('Deletando as sales com id', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves(sales);
    sinon.stub(salesModel, 'removeSale').resolves(deleteReturn);

    const result = await saleService.removeSale(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal([]);
  });

  it('Deletando as sales com id', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves(undefined);

    const result = await saleService.removeSale(1);

    expect(result.type).to.equal('not found');
    expect(result.message).to.deep.equal('Sale not found');
  });

  it('atualizando as sales corretamente', async function () {
    sinon.stub(salesModel, 'updateSaleProduct').resolves(updateResult);

    const result = await saleService
        .updateSale([{ productId: 1, quantity: 20 }], 1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(saleProductUpdate.message);
  });

  it('atualizando as sales com sale_id inexistente', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves(undefined);

    const result = await saleService
        .updateSale([{ productId: 1, quantity: 20 }], 999);

    expect(result.type).to.equal('not found');
    expect(result.message).to.deep.equal('Sale not found');
  });

  it('atualizando as sales com product_id inexistente', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const result = await saleService
        .updateSale([{ productId: 999, quantity: 20 }], 1);

    expect(result.type).to.equal('not found');
    expect(result.message).to.deep.equal('Product not found');
  });

  it('atualizando com product_id sendo string', async function () {
    const result = await saleService.updateSale([{ productId: '', quantity: 2 }], 1);

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"productId" must be a number');
  })

  it('atualizando com product_id sendo undefined', async function () {
    const result = await saleService.updateSale([{ productId: undefined, quantity: 1 }], 1);

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"productId" is required');
  })

  it('inserindo com product_id sendo 0', async function () {
    const result = await saleService.createSale([{ productId: 0, quantity: 1 }], 1);

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"productId" must be greater than or equal to 1');
  })

  it('inserindo com quantity sendo string', async function () {
    const result = await saleService.updateSale([{ productId: 3, quantity: '' }], 1);

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"quantity" must be a number');
  })

  it('inserindo com quantity sendo undefined', async function () {
    const result = await saleService.updateSale([{ productId: 3, quantity: undefined }], 1);

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"quantity" is required');
  })

  it('inserindo com quantity sendo 0', async function () {
    const result = await saleService.updateSale([{ productId: 3, quantity: 0 }], 1);

    expect(result.type).to.equal('error');
    expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
  })
});