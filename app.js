const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const products = require('./routes/products.js');
const articles = require('./routes/articles.js');

const app = express();
app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// const PORT = process.env.PORT || 8080;

// app.get('/smoke', (req, res) => {
//   res.send('smoke test');
// });

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

app.use('/products', products);

app.use('/articles', articles);

// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });

module.exports = app;