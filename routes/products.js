const express = require('express');
const Products = require('../models/products.js');
const router = express.Router();
const products = new Products();

router.post('/', (req, res) => {
  const data = req.body;
  products.create(data);
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const ID = req.params.id;
  products.update(data, ID)
    .then((updatedProduct) => {
      res.redirect(`/products/${ID}`);
    });
});

router.delete('/:id', (req, res) => {
  const ID = req.params.id;
  products.delete(ID);
  res.redirect('/products');
});

router.get('/', (req, res) => {
  products.all()
    .then((productList) => {
      let locals = {
        collection: productList
      }
      res.render('productViews/index', locals);
    });
});

// router.get('/new', (req, res) => {
//   res.render
// })

router.get('/:id', (req, res) => {
  const ID = req.params.id;
  products.single(ID)
    .then((singleProduct) => {
      let locals = {
        item: singleProduct[0]
      }
      res.render('productViews/single', locals);
    });
});

router.get('/:id/edit', (req, res) => {
  const ID = req.params.id;
  products.single(ID)
    .then((singleProduct) => {
      let locals = {
        id: ID,
        item: singleProduct[0]
      }
      res.render('productViews/edit', locals);
    });
});

module.exports = router;