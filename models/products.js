const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'products_articles',
  user: 'db_owner',
  password: 'pw'
};

const db = pgp(cn);

class Products {

  constructor(){

  }

  create(data){
    return db.any('INSERT INTO products(name, price, inventory) VALUES($1, $2, $3)', [data.name, data.price, data.inventory])
      .then((data) => {
        console.log('success');
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  update(data, ID){
    return db.any('SELECT name, price, inventory FROM products WHERE id = $1', [ID])
      .then((oldProduct) => {
        if(data.name){
          db.any('UPDATE products SET name = $1 WHERE id = $2', [data.name, ID]);
          console.log('name updated');
        }
        if(data.price){
          db.any('UPDATE products SET price = $1 WHERE id = $2', [data.price, ID]);
          console.log('price updated');
        }
        if(data.inventory){
          db.any('UPDATE products SET inventory = $1 WHERE id = $2', [data.inventory, ID]);
          console.log('inventory updated');
        }
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  delete(ID){
    return db.any('DELETE FROM products WHERE id = $1', [ID])
      .then(() => {
        console.log(`Product with id: ${ID} deleted`);
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }
}

module.exports = Products;
