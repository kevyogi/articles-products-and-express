const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'products_articles',
  user: 'db_owner',
  password: 'pw'
};

const db = pgp(cn);

module.exports = db;