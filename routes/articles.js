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
  articles.update(data, title);
});

module.exports = router;