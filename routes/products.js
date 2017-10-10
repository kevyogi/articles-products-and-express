const express = require('express');
const Products = require('../db/products.js');
const products = new Products
const router = express.Router();

// let productsArray = [];

router.post('/', (req, res) => {
  const data = req.body;
  if(!data.name || !data.price || !data.inventory){
    res.redirect('products/new');
  }else{
    products.create(data);
    res.redirect('/products');
  }
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const targetProduct = products.getById(req.url);
  if(data.name || data.price || data.inventory){
    if(targetProduct){
      products.edit(data, targetProduct);
      res.redirect(`/products/${targetProduct.id}`);
    }else{
      res.redirect(`/products${req.url}/edit`);
    }
  }else{
    res.redirect(`/products${req.url}/edit`);
  }
});

router.delete('/:id', (req, res) => {
  products.delete(req, res);
});

module.exports = router;