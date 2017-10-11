const express = require('express');
const Artciles = require('../db/articles.js');
const articles = new Artciles();
const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  if(!data.title || !data.body || !data.author){
    res.redirect('/articles/new');
  }else{
    articles.create(data);
    res.redirect('/articles');
  }
});

router.put('/:title', (req, res) => {
  const data = req.body
  const title = data.title;
  let targetArticle = articles.findArticle(title);
  if(targetArticle){
    if(data.title || data.body || data.author){
      let newData = articles.edit(data, targetArticle);
      res.redirect(`/articles/${newData.title}`);
    }else{
      res.redirect(`/articles/${title}`);
    }
  }else{
    res.redirect(`/articles/${title}`);
  }
});

router.delete('/:title', (req, res) => {
  const data = req.body;
  const title = data.title;
  let targetArticle = articles.findArticle(title);
  if(targetArticle){
    articles.delete(targetArticle);
    res.redirect('/');
  }else{
    res.redirect('/:title');
  }
})

module.exports = router;