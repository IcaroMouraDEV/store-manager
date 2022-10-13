const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

const { expect } = chai;
chai.use(sinonChai)

const { productService } = require('../../../src/services');
const productController = require('../../../src/controllers/product.controller');
const { products, updatedProduct } = require('./mocks/productMock');
const { productModel } = require('../../../src/models');

describe('Verificando controller de Products', function () {
  afterEach(sinon.restore)

  it('Buscando todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'findAllProduct')
      .resolves({ type: null, message: products });

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Buscando produto pelo id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'findProductById')
      .resolves({ type: null, message: products[0] });

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('Buscando produto pelo id invalido', async function () {
    const res = {};
    const req = { params: { id: 4 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'findProductById')
      .resolves({ type: 'error', message: 'Product not found' });

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('inserindo produto corretamente', async function () {
    const res = {};
    const req = { body: { name: 'Capa do dr. Estranho' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'createProduct')
      .resolves({ type: null, message: products[0] });

    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('inserindo produto sem o name', async function () {
    const res = {};
    const req = { body: { name: undefined } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'createProduct')
      .resolves({ type: 'error', message: '"name" is required' });

    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('atualizando o produto corretamente', async function () {
    const res = {};
    const req = { body: { name: 'Capa do dr. Estranho' }, params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct')
      .resolves({ type: null, message: updatedProduct });

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });

  it('atualizando o produto com o nome incorreto', async function () {
    const res = {};
    const req = { body: { name: 'Capa' }, params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct')
      .resolves({ type: 'error', message: '"name" length must be at least 5 characters long' });

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('atualizando o produto com o id incorreto', async function () {
    const res = {};
    const req = { body: { name: 'Capa do batman' }, params: { id: 999 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct')
      .resolves({ type: 'not found', message: 'Product not found' });

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });

  it('Deletando o produto corretamente', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteProduct')
      .resolves({ type: null, message: [] });

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith([]);
  });

  it('Deletando o produto com id inexistente', async function () {
    const res = {};
    const req = { params: { id: 11111 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteProduct')
      .resolves({ type: 'not found', message: 'Product not found' });

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });
});