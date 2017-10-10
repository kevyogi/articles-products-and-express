class Products {

  constructor(){
    this._collection = [];
    this._id = 0;
  }

  create(data){
    this._collection.push({'id': (this._id), 'name': data.name, 'price': Number(data.price), 'inventory': Number(data.inventory)});
    this._id++;
    console.log(this._collection);
  }

  getById(reqURL){
    let ID = Number((reqURL.split('/')[1]));
    for(let i = 0; i < this._collection.length; i++){
      if(this._collection[i].id === ID){
        return this._collection[i];
      }else if(i === this._collection.length-1){
        return false;
      }
    }
  }

  edit(data, target){
    console.log(this._collection);
    if(data.name){
      target.name = data.name;
    }
    if(data.price){
      target.price = data.price;
    }
    if(data.inventory){
      target.inventory = data.inventory;
    }
    console.log(this._collection);
    return target;
  }

  delete(req, res){
    let r = req.body;
    for(let i = 0; i < collection.length; i++){
      if(collection[i].id === Number(req.param.id)){
        collection.splice(i, 1);
        console.log(collection);
        res.redirect('/products');
      }else if(i === collection.length-1){
        res.redirect('/products/:id');
      }
    }
  }

}



module.exports = Products