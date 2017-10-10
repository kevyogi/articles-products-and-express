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

  delete(target){
    let targetIndex = this._collection.indexOf(target);
    this._collection.splice(targetIndex, 1);
    console.log(this._collection);
  }

}



module.exports = Products