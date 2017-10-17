const express = require('express');
const Articles = require('../index/articles.js');
const router = express.Router();
const articles = new Articles();

router.post('/', (req, res) => {
  const data = req.body;
  articles.create(data)
    .then(() => {
      res.redirect('/articles');
    });
});

module.exports = router;