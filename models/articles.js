const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'products_articles',
  user: 'db_owner',
  password: 'pw'
};

const db = pgp(cn);

class Articles {
  constructor(){

  }

  // all(){
  //   db.any('SELECT ')
  // }

  create(data){
    return db.any('INSERT INTO articles(title, body, author, urlTitle) VALUES($1, $2, $3, $4)', [data.title, data.body, data.author, encodeURI(data.title)])
      .then(() => {
        console.log('New article created');
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }
}