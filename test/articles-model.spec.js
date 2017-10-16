const chai = require('chai');
const expect = chai.expect;

const Articles = require('../db/articles');

describe('Articles Class', function(){
  const articles = new Articles();

  before(function(){
    articles.create({title: 'Hello', body: 'Goodbye', author: 'Bob'});
  });

  it('should be a Class', function(){
    expect(Articles).to.be.a('function');
  });

  describe('all method', function(){
    it('should be a method', function(){
      expect(articles.all).to.be.a('function');
    });
    it('should return the entire collection', function(){
      expect(articles.all()).to.deep.equal([{title: 'Hello', body: 'Goodbye', author: 'Bob', urlTitle: 'Hello'}]);
    });
  });

  describe('create method', function(){
    it('should be a method', function(){
      expect(articles.create).to.be.a('function');
    });
    it('should create object with property title (string)', function(){
      expect(articles._collection[0]).to.have.property('title');
      expect(articles._collection[0].title).to.be.a('string');
    });
    it('should create object with property body (string)', function(){
      expect(articles._collection[0]).to.have.property('body');
      expect(articles._collection[0].body).to.be.a('string');
    });
    it('should create object with property author (string)', function(){
      expect(articles._collection[0]).to.have.property('author');
      expect(articles._collection[0].author).to.be.a('string');
    });
    it('should create object with property urlTitle (string)', function(){
      expect(articles._collection[0]).to.have.property('urlTitle');
      expect(articles._collection[0].urlTitle).to.be.a('string');
    });
    it('should add object to the collection', function(){
      articles.create({title: 'Yes', body: 'No', author: 'Ben'});
      expect(articles._collection).to.deep.equal([{title: 'Hello', body: 'Goodbye', author: 'Bob', urlTitle: 'Hello'}, {title: 'Yes', body: 'No', author: 'Ben', urlTitle: 'Yes'}]);
    });
  });

  describe('validate method', function(){
    it('should be a method', function(){
      expect(articles.validate).to.be.a('function');
    });
    it('should return true if article with same title already exists', function(){
      expect(articles.validate('Hello')).to.equal(true);
    });
    it('should return false otherwise', function(){
      expect(articles.validate('Blah')).to.equal(false);
    });
  });

  describe('findArticle method', function(){
    it('should be a method', function(){
      expect(articles.findArticle).to.be.a('function');
    });
    it('should return object with same title', function(){
      expect(articles.findArticle('Hello')).to.deep.equal({title: 'Hello', body: 'Goodbye', author: 'Bob', urlTitle: 'Hello'})
    });
    it('should return undefined if no title exists with said title', function(){
      expect(articles.findArticle('Blah')).to.equal(undefined);
    });
  });

  describe('edit method', function(){
    it('should be a method', function(){
      expect(articles.edit).to.be.a('function');
    });
    it('should change title/body/author if applicable and return edited object', function(){
      expect(articles.edit({title: 'My Title', author: 'Joe'}, {title: 'Hello', body: 'Goodbye', author: 'Bob', urlTitle: 'Hello'}))
      .to.deep.equal({title: 'My Title', body: 'Goodbye', author: 'Joe', urlTitle: 'My%20Title'});
    });
  });

  describe('delete method', function(){
    it('should be a method', function(){
      expect(articles.delete).to.be.a('function');
    });
    it('should delete specified object from collection', function(){
      let target = articles.findArticle('Hello');
      articles.delete(target);
      expect(articles._collection).to.deep.equal([{title: 'Yes', body: 'No', author: 'Ben', urlTitle: 'Yes'}])
    });
  });
});