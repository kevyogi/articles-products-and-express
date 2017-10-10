const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const products = require('./routes/products.js');
const articles = require('./routes/articles.js');

const app = express();
const PORT = process.env.PORT || 8080

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded( {extended: false} ));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/products', products);

app.use('/articles', articles);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});