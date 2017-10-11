class Products {

  constructor(){
    this._collection = [];
    this._id = 0;
  }

  all(){
    return this._collection;
  }

  validate(name){
    let isThere = this._collection.some((element) => {
      return name === element.name;
    });
    return isThere;
  }

  create(data){
    let newProduct = {
      'id': (this._id),
      'name': data.name,
      'price': Number(data.price),
      'inventory': Number(data.inventory)
    };
    this._collection.push(newProduct);
    this._id++;
    console.log(this._collection);
    return newProduct;
  }

  getById(id){
    for(let i = 0; i < this._collection.length; i++){
      if(this._collection[i].id === id){
        return this._collection[i];
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
    // console.log(this._collection);
    return target;
  }

  delete(target){
    let targetIndex = this._collection.indexOf(target);
    this._collection.splice(targetIndex, 1);
    console.log(this._collection);
  }

}



module.exports = Products