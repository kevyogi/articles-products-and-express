const express = require('express');
const Artciles = require('../db/articles.js');
const articles = new Artciles();
const router = express.Router();

router.post('/', (req, res) => {
  const data = req.body;
  if((!data.title || !data.body || !data.author || articles.validate(data.title)) && articles.all().length > 0){
    res.redirect('/articles/new');
  }else{
    articles.create(data);
    res.redirect('/articles');
  }
});

router.put('/:title', (req, res) => {
  const data = req.body
  const title = req.params.title;
  let targetArticle = articles.findArticle(title);
  if(targetArticle){
    if(data.title || data.body || data.author){
      let newData = articles.edit(data, targetArticle);
      console.log('success', newData)
      res.redirect(`/articles/${newData.title}`);
    }else{
      res.redirect(`/articles/${title}`);
      console.log('failure1');
    }
  }else{
    res.redirect(`/articles/${title}`);
    console.log('failure2')
  }
});

router.delete('/:title', (req, res) => {
  const data = req.body;
  const title = req.params.title;
  let targetArticle = articles.findArticle(title);
  if(targetArticle){
    articles.delete(targetArticle);
    res.redirect('/articles');
  }else{
    res.redirect('/:title');
  }
});

router.get('/', (req, res) => {
  let artObj = {
    articleList: articles.all(),
    back: "",
    forward: 'Articles'
  }
  res.render('articleViews/index', artObj)
});

router.get('/new', (req, res) => {
  let artObj = {
    back: 'articles'
  }
  res.render('articleViews/new', artObj);
})

router.get('/:title', (req, res) => {
  const title = req.params.title;
  console.log(title);
  let artObj = {
    target: articles.findArticle(title),
    back: 'articles'
  }
  res.render('articleViews/article', artObj);
});

router.get('/:title/edit', (req, res) => {
  const title = req.params.title;
  const targetArticle = articles.findArticle(title);
  res.render('articleViews/edit', targetArticle);
});

module.exports = router;