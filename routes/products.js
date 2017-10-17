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
  products.update(data, ID);
});

router.delete('/:id', (req, res) => {
  const ID = req.params.id;
  products.delete(ID);
});

router.get('/', (req, res) => {
  let productList = products.all();
  console.log(productList);
});

module.exports = router;