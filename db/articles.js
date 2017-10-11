class Articles {
  constructor(){
    this._collection = [];
  }

  create(data){
    let urlTitle = encodeURI(data.title);
    let newArticle = {
      title: data.title,
      body: data.body,
      author: data.author,
      urlTitle: urlTitle
    }
    this._collection.push(newArticle);
    console.log(this._collection);
    return newArticle;
  }

  validate(data){
    let isThere = this._collection.some((element) => {
      return data === element.title
    });
    return isThere;
  }

  all(){
    return this._collection;
  }

  findArticle(title){
    for(let i = 0; i < this._collection.length; i++){
      if(title === this._collection[i].title){
        return this._collection[i];
      }
    }
  }

  edit(data, target){
    if(data.title){
      target.title = data.title;
      target.urlTitle = encodeURI(data.title);
    }
    if(data.body){
      target.body = data.body;
    }
    if(data.author){
      target.author = data.author;
    }
    return target;
  }

  delete(target){
    let targetArticle = this._collection.indexOf(target);
    this._collection.splice(targetArticle, 1);
  }
}

module.exports = Articles;