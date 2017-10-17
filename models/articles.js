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

  all(){
    db.any('SELECT id, title, body, author FROM articles')
      .then((list) => {
        return list;
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }

  single(ID){
    return db.any('SELECT id, title, body, author FROM articles WHERE id = $1', ID)
      .then((item) => {
        return item;
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  create(data){
    return db.any('INSERT INTO articles(title, body, author, urlTitle) VALUES($1, $2, $3, $4)', [data.title, data.body, data.author, encodeURI(data.title)])
      .then(() => {
        console.log('New article created');
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  update(data, ID){
    return db.any('SELECT title, body, author FROM articles WHERE id = $1', ID)
      .then((oldArt) => {
        if(data.title){
          oldArt[0].title = data.title;
        }
        if(data.body){
          oldArt[0].body = data.body;
        }
        if(data.author){
          oldArt[0].author = data.author;
        }
        return this.single(ID);
      })
  }
}