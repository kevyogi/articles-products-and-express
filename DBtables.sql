DROP DATABASE IF EXISTS products_articles;
DROP USER IF EXISTS db_owner;

CREATE USER db_owner WITH PASSWORD 'pw';
CREATE DATABASE products_articles OWNER = db_owner;

\c products_articles;

SET ROLE 'db_owner';

DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id        SERIAL        PRIMARY KEY,
  title     varchar(255)  NOT NULL UNIQUE,
  body      varchar(255)  NOT NULL,
  author    varchar(255)  NOT NULL,
  urlTitle  varchar(255)  NOT NULL
);

DROP INDEX IF EXISTS title_index;
CREATE INDEX title_index ON articles (title);

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id        SERIAL        PRIMARY KEY,
  name      varchar(255)  NOT NULL UNIQUE,
  price     money         NOT NULL,
  inventory int           NOT NULL
);

DROP INDEX IF EXISTS name_index;
CREATE INDEX name_index ON products (name);