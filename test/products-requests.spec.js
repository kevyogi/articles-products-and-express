const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;
const request = require('supertest');

const app = require('../app');

describe('GET smoke test', function () {
  // it('smoke test', function(done){
  //   request(app)
  //     .get('/smoke')
  //     //.get('/products/1')
  //     .expect(200)
  //     .expect('Content-Type', /text\/html/)
  //     .end(done);
  // });

  it('should get all products', function(done){
    request(app)
      .get('/products')
      .set('Accept', 'text/html')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect({'id': 0, 'name': 'test', 'price': 5.99, 'inventory': 5})
      .end(done);
  });

  it('should add new product', function(done){
    request(app)
      .post('/products')
      .type('form')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({id: 0, name: 'Dune', price: 4.99, inventory: 4})
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(function(res){
        return (res.body.id && typeof res.body.id === 'number');
      })
      .end(done);
  });
});

