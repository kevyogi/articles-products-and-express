const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;
const request = require('supertest');

const app = require('../app');

describe('GET pages', function(){
  it('should render home page', function(done){
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(done);
  });
  it('should render products page', function(done){
    request(app)
      .get('/products')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(done);
  });
});

// describe('GET products', function(){
//   it('should get all products', function(done){
//     request(app)
//       .get('/products')
//       .set('Accept', 'text/html')
//       .expect(200)
//       .expect('Content-Type', /text\/html/)
//       .expect([{id: 1, name: 'Dune', price: 5.99, inventory: 5}])
//       .end(done);
//   });
// });

// describe('POST new product', function(){
//   it('should add new item to collection', function(done){
//     request(app)
//       .post('/products')
//       .type('form')
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/x-www-form-urlencoded')
//       .send({name: 'Raft', price: 4.99, inventory: 3})
//       .expect('Content-Type', /application\/json/)
//       .expect(function(res){
//         return (res.body.id && typeof res.body.id === 'number');
//       })
//       .end(done);
//   });
// });