const db = require('./connection.js');

class Products {

  constructor(){

  }

  all(){
    return db.any('SELECT id, name, price, inventory FROM products')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  single(ID){
    return db.any('SELECT id, name, price, inventory FROM products WHERE id = $1', ID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  }

  create(data){
    return db.any('INSERT INTO products(name, price, inventory) VALUES($1, $2, $3)', [data.name, data.price, data.inventory])
      .then((newProduct) => {
        return newProduct;
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
        return this.single(ID);
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
