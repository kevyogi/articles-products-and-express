const chai = require('chai');
const expect = chai.expect;

const Products = require('../db/products');

const products = new Products();

describe('Products tests', function(){
  it('should add a new product to the collection', function(){
    products.create(data);
    expect(data).to.have.property(id);
  });

  it('should get product by id', function(){
    let target = products.getById('a Number');
    expect(target.id).to.equal('said number above');
  })
});