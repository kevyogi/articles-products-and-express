const express = require('express');
const Articles = require('../models/articles.js');
const router = express.Router();
const articles = new Articles();

router.post('/', (req, res) => {
  const data = req.body;
  articles.create(data)
    .then(() => {
      res.redirect('/articles');
    });
});

router.put('/:title', (req, res) => {
  const data = req.body;
  const title = req.params.title;
  console.log(title);
  articles.update(data, title)
    .then((updatedArt) => {
      res.redirect(`/articles/`);
    });
});

router.delete('/:title', (req, res) => {
  const title = req.params.title;
  articles.delete(title)
});

router.get('/', (req, res) => {
  articles.all()
    .then((list) => {
      let locals = {
        collection: list
      }
      res.render('articleViews/index', locals);
    });
});

router.get('/:title', (req, res) => {
  const title = req.params.title;
  articles.single(title)
    .then((item) => {
      let locals = {
        item: item[0]
      }
      res.render('articleViews/single', locals);
    });
});

router.get('/:title/edit', (req, res) => {
  const title = req.params.title;
  articles.single(title)
    .then((item) => {
      let locals = {
        item: item[0]
      }
      res.render('articleViews/edit', locals);
    });
});

module.exports = router;