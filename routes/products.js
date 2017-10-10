const express = require('express');
const Products = require('../db/products.js');
const products = new Products
const router = express.Router();

// let productsArray = [];

router.post('/', (req, res) => {
  products.create(req, res);
});

router.put('/:id', (req, res) => {
  products.edit(req, res);
});

router.delete('/:id', (req, res) => {
  products.delete(req, res);
});

module.exports = router;