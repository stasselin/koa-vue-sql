const mysql = require('mysql');
const keys = require('../config/keys');
const faker = require('faker');

exports.addBook = async (ctx, next) => {
  console.log(ctx.request);

  const connection = mysql.createConnection({
    host: keys.DB_HOST_NAME,
    user: keys.DB_USER,
    password: keys.DB_PASSWORD,
    database: 'books_db'
  });

  connection.connect();

  connection.query(
    `INSERT INTO Books (title,date,author,description,image) VALUES(?,?,?,?,?);`,
    [
      ctx.request.query.title,
      ctx.request.query.date,
      ctx.request.query.author,
      ctx.request.query.description,
      ctx.request.query.image
    ],
    function(error, results, fields) {
      console.log(this.sql);
      if (error) throw error;
    }
  );

  connection.end();
  ctx.redirect('/');
};

exports.getAll = async (ctx, next) => {
  return new Promise(function(resolve, reject) {
    const connection = mysql.createConnection({
      host: keys.DB_HOST_NAME,
      user: keys.DB_USER,
      password: keys.DB_PASSWORD,
      database: 'books_db'
    });

    connection.connect();

    connection.query(`SELECT * FROM Books LIMIT 25 OFFSET ${ctx.request.query.page * 25}`, function(
      error,
      results,
      fields
    ) {
      console.log(this.sql);
      if (error) reject();
      ctx.body = results;
      resolve();
    });
    connection.end();
  });
};

exports.search = async (ctx, next) => {
  return new Promise(function(resolve, reject) {
    const connection = mysql.createConnection({
      host: keys.DB_HOST_NAME,
      user: keys.DB_USER,
      password: keys.DB_PASSWORD,
      database: 'books_db'
    });

    whereQuery = 'WHERE ';
    if (ctx.request.query.title) {
      whereQuery += `title LIKE '%${ctx.request.query.title}%',`;
    }
    if (ctx.request.query.date) {
      whereQuery += `date='${ctx.request.query.date}',`;
    }
    if (ctx.request.query.author) {
      whereQuery += `author='${ctx.request.query.author}',`;
    }
    if (ctx.request.query.description) {
      whereQuery += `description='${ctx.request.query.description}',`;
    }
    if (ctx.request.query.image) {
      whereQuery += `image='${ctx.request.query.image}',`;
    }

    if (whereQuery == 'WHERE ') {
      whereQuery = '';
    }

    whereQuery = whereQuery.replace(/(^,)|(,$)/g, '');

    connection.connect();

    connection.query(`SELECT * FROM Books ${whereQuery} LIMIT 25 OFFSET 0;`, function(error, results, fields) {
      console.log(this.sql);
      if (error) reject();
      ctx.body = results;
      resolve();
    });
    connection.end();
  });
};

exports.updateBook = async (ctx, next) => {
  console.log(ctx.request);

  const connection = mysql.createConnection({
    host: keys.DB_HOST_NAME,
    user: keys.DB_USER,
    password: keys.DB_PASSWORD,
    database: 'books_db'
  });

  connection.connect();

  connection.query(
    `UPDATE Books SET title=?,date=?,author=?,description=?,image=? WHERE id=?;`,
    [
      ctx.request.query.title,
      ctx.request.query.date,
      ctx.request.query.author,
      ctx.request.query.description,
      ctx.request.query.image,
      ctx.params.id
    ],
    function(error, results, fields) {
      console.log(this.sql);
      if (error) throw error;
    }
  );

  connection.end();
  ctx.redirect('/');
};
