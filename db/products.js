const collection = [];
let idNumber = 0;

class Products {

  create(req, res){
    if(!req.body.name || !req.body.price || !req.body.inventory){
      res.redirect('products/new');
    }else{
      collection.push({'id': (idNumber), 'name': req.body.name, 'price': Number(req.body.price), 'inventory': Number(req.body.inventory)});
      idNumber++;
      res.redirect('/products');
      console.log(collection);
    }
  }

  edit(req, res){
    let r = req.body;
    for(let i = 0; i < collection.length; i++){
      if(collection[i].id === Number(r.id)){
        if(r.name){
          collection[i].name = r.name;
        }
        if(r.price){
          collection[i].price = Number(r.price);
        }
        if(r.inventory){
          collection[i].inventory = Number(r.inventory);
        }
        res.redirect('/:id')
      }else if(i === collection.length - 1){
        res.redirect('/:id/edit')
      }
    }
    console.log(collection);
  }

  delete(req, res){
    let r = req.body;
    for(let i = 0; i < collection.length; i++){
      if(collection[i].id === Number(r.id)){
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