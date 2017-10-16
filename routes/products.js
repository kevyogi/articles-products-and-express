const express = require('express');
const Products = require('../db/products.js');
const products = new Products
const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  if(!data.name || !data.price || !data.inventory){
    res.redirect('/products/new');
  }else if(products.validate(data.name) || isNaN(data.price) || isNaN(data.inventory) || Number(data.price) <= 0 || Number(data.inventory) <= 0){
    res.redirect('/products/new')
  }else{
    products.create(data);
    res.redirect('/products');
  }
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const ID = Number(req.params.id);
  const targetProduct = products.getById(ID);
  console.log(Number(data.price), Number(data.inventory));
  if(data.name || data.price || data.inventory){
    if(isNaN(Number(data.price)) || isNaN(Number(data.inventory))){
      res.redirect(`/products/${ID}/edit`);
    }else if(targetProduct){
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
  let prodObj = {
    collection: products.all(),
    back: "",
    forward: 'Products'
  }
  res.render('productViews/index', prodObj);
});

router.get('/new', (req, res) => {
  let prodObj = {
    back: 'products',
  }
  res.render('productViews/new', prodObj);
});

router.get('/:id', (req, res) => {
  const ID = Number(req.params.id);
  let prodObj = {
    target: products.getById(ID),
    back: 'products'
  }
  const targetProduct = products.getById(ID);
  res.render('productViews/product', prodObj);
});

router.get('/:id/edit', (req, res) => {
  const ID = Number(req.params.id);
  const targetProduct = products.getById(ID);
  res.render('productViews/edit', targetProduct);
});

module.exports = router;