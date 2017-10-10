const express = require('express');
const Products = require('../db/products.js');
let router = express.Router();

// let productsArray = [];

router.post('/', (req, res) => {
  Products.createDataObj(req, res);
});

router.put('/:id', (req, res) => {

});

module.exports = router;