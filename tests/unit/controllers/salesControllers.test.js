const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleService } = require('../../../src/services');
const { saleProduct, allSaleProduct, saleProductById } = require('./mocks/saleMock');
const saleController = require('../../../src/controllers/sales.controller');
const { productModel } = require('../../../src/models');
const { expect } = chai;
chai.use(sinonChai)

describe('Verificando controller de Sales', function () {
  afterEach(sinon.restore);

  it('inserindo sale corretamente', async function () {
  const res = {};
  const req = {
    body: [
      {
        productId: 1,
        quantity: 1,
      }
    ],
  };

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  sinon.stub(saleService, 'createSale')
    .resolves(saleProduct);

  await saleController.insertProduct(req, res)

  expect(res.status).to.have.been.calledWith(201);
  expect(res.json).to.have.been.calledWith(saleProduct.message);
  });

  describe('inserindo sale incorretamente', function () {
    it('inserindo sale com id sendo string', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: '',
            quantity: 1,
          }
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.insertProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"productId" must be a number' });
    });

    it('inserindo sale com id sendo undefined', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: undefined,
            quantity: 1,
          }
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.insertProduct(req, res)

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('inserindo sale com id inexistente', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 9999,
            quantity: 1,
          }
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productModel, 'findById').resolves(undefined)

      await saleController.insertProduct(req, res)

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('inserindo sale com quantity sendo string', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: '',
          }
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.insertProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be a number' });
    });

    it('inserindo sale com quantity sendo 0', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 0,
          }
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.insertProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  })

  it('recuperando todas as sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'getAllSales')
      .resolves({ type: null, message: allSaleProduct });

    await saleController.getAllProducts(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSaleProduct);
  });

  it('recuperando as sales com id 1', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'getSalesById')
      .resolves({ type: null, message: saleProductById });

    await saleController.getProductsById(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleProductById);
  });

  it('recuperando as sales com id inexistente', async function () {
    const res = {};
    const req = { params: { id: 444 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'getSalesById')
      .resolves({ type: 'not found', message: 'Sale not found' });

    await saleController.getProductsById(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
})