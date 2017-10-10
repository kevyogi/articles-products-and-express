const express = require('express');
const Products = require('../db/products.js');
const products = new Products
const router = express.Router();

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
  const targetProduct = products.getById(req.url);
  if(targetProduct){
    products.delete(targetProduct);
    res.redirect('/products');
  }else{
    res.redirect(`/products${req.url}`);
  }
});

router.get('/', (req, res) => {
  const productList = products.all();
  // console.log(productList);
  res.render('home', {productList: products.all()});
})

module.exports = router;