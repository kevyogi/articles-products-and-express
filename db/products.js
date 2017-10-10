const collection = [];

function createDataObj(req, res){
  if(!req.body.name || !req.body.price || !req.body.inventory){
    res.redirect('/new');
  }else{
    collection.push({'id': (collection.length+1), 'name': req.body.name, 'price': Number(req.body.price), 'inventory': req.body.inventory});

  }
}

module.exports = {
  createDataObj: createDataObj
}