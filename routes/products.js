const express = require('express');
const Products = require('../db/products.js');
const products = new Products
const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  if((!data.name || !data.price || !data.inventory || products.validate(data.name)) && products.all().length > 0){
    res.redirect('products/new');
  }else{
    products.create(data);
    res.redirect('/products');
  }
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const ID = Number(req.params.id);
  const targetProduct = products.getById(ID);
  if(data.name || data.price || data.inventory){
    if(targetProduct){
      products.edit(data, targetProduct);
      res.redirect(`/products/${ID}`);
    }else{
      res.redirect(`/products/${ID}/edit`);
    }
  }else{
    res.redirect(`/products/${ID}/edit`);
  }
});

router.delete('/:id', (req, res) => {
  const ID = Number(req.params.id);
  const targetProduct = products.getById(ID);
  if(targetProduct){
    products.delete(targetProduct);
    res.redirect('/products');
  }else{
    res.redirect(`/products/${ID}`);
  }
});

router.get('/', (req, res) => {
  res.render('layouts/index', {productList: products.all()});
});

router.get('/new', (req, res) => {
  res.render('layouts/new');
});

router.get('/:id', (req, res) => {
  const ID = Number(req.params.id);
  const targetProduct = products.getById(ID);
  res.render('layouts/product', targetProduct);
});

router.get('/:id/edit', (req, res) => {
  const ID = Number(req.params.id);
  const targetProduct = products.getById(ID);
  res.render('layouts/edit', targetProduct);
});

module.exports = router;