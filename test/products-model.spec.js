const chai = require('chai');
const expect = chai.expect;

const Products = require('../db/products');

describe('Products Class', function(){
  const products = new Products();

  before(function(){
    products.create({name: 'Dune', price: '5.99', inventory: '3'});
  });

  it('Should be a Class', function(){
    expect(Products).to.be.a('function');
  });

  describe('all method', function(){
    it('should be a method', function(){
      expect(products.all).to.be.a('function');
    });
    it('should return the entire collection', function(){
      expect(products.all()).to.deep.equal([{id: 1, name: 'Dune', price: 5.99, inventory: 3}]);
    });
  });

  describe('create method', function(){
    it('should be a function', function(){
      expect(products.create).to.be.a('function');
    });
    it('should create object with property id (number)', function(){
      expect(products._collection[0]).to.have.property('id');
      expect(products._collection[0].id).to.be.a('number');
    });
    it('should create object with property name (string)', function(){
      expect(products._collection[0]).to.have.property('name');
      expect(products._collection[0].name).to.be.a('string');
    });
    it('should create object with property price (number)', function(){
      expect(products._collection[0]).to.have.property('price');
      expect(products._collection[0].price).to.be.a('number');
    });
    it('should create object with property inventory (number)', function(){
      expect(products._collection[0]).to.have.property('inventory');
      expect(products._collection[0].price).to.be.a('number');
    })
    it('should add object to collection', function(){
      products.create({name: 'Revelation Space', price: '5.99', inventory: '5'});
      expect(products._collection).to.deep.equal([{id: 1, name: 'Dune', price: 5.99, inventory: 3}, {id: 2, name: 'Revelation Space', price: 5.99, inventory: 5}]);
    });
  });

  describe('validate method', function(){
    it('should be a function', function(){
      expect(products.validate).to.be.a('function');
    });
    it('should return true if product with same name already exists', function(){
      expect(products.validate('Dune')).to.equal(true);
    });
    it('should return false otherwise', function(){
      expect(products.validate('Diaspora')).to.equal(false);
    });
  });

  describe('getById method', function(){
    it('should be a function', function(){
      expect(products.getById).to.be.a('function');
    });
    it('should return object with matching id from collection', function(){
      expect(products.getById(1)).to.deep.equal({id: 1, name: 'Dune', price: 5.99, inventory: 3});
    });
    it('should return undefined if no matching id exists', function(){
      expect(products.getById(5)).to.equal(undefined);
    });
  });

  describe('edit method', function(){
    it('should be a function', function(){
      expect(products.edit).to.be.a('function');
    });
    it('should edit name/price/inventory properties', function(){
      expect(products.edit({name: 'Diaspora', price: 4.99}, {id: 1, name: 'Dune', price: 5.99, inventory: 3}))
      .to.deep.equal({id: 1, name: 'Diaspora', price: 4.99, inventory: 3});
    });
  });

  describe('delete method', function(){
    it('should be a function', function(){
      expect(products.delete).to.be.a('function');
    });
    it('should delete specified object from collection', function(){
      expect(products.delete({id: 2, name: 'Revelation Space', price: 5.99, inventory: 5}))
      .to.deep.equal([{id: 1, name: 'Dune', price: 5.99, inventory: 3}]);
    });
  });

});
