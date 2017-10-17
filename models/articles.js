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

  single(reqTitle){
    return db.any('SELECT id, title, body, author FROM articles WHERE title = $1', reqTitle)
      .then((item) => {
        return item;
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  create(data){
    return db.any('INSERT INTO articles(title, body, author, urlTitle) VALUES($1, $2, $3, $4)', [data.title, data.body, data.author, encodeURI(data.title)])
      .then((newArt) => {
        console.log('New article created');
        return newArt;
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  update(data, reqTitle){
    return db.any('SELECT title, body, author FROM articles WHERE title = $1', reqTitle)
      .then((oldArt) => {
        if(data.title){
          db.any('UPDATE articles SET title = $1 WHERE title = $2', [data.title, reqTitle]);
          db.any('UPDATE articles SET urlTitle = $1 WHERE title = $2', [encodeURI(data.title), reqTitle]);
          console.log('title updated');
        }
        if(data.body){
          db.any('UPDATE articles SET body = $1 WHERE title = $2', [data.body, reqTitle]);
          console.log('body updated');
        }
        if(data.author){
          db.any('UPDATE articles SET author = $1 WHERE title = $2', [data.author, reqTitle]);
          console.log('author updated');
        }
        return this.single(reqTitle);
      })
  }
}

module.exports = Articles;