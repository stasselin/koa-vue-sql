const faker = require('faker');
const mysql = require('mysql');
const keys = require('../config/keys');
const connection = mysql.createConnection({
  host: keys.DB_HOST_NAME,
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  database: 'books_db'
});

connection.connect();

connection.query(
  'CREATE TABLE Books (id MEDIUMINT NOT NULL AUTO_INCREMENT, title VARCHAR(255),date DATE, author VARCHAR(255), description VARCHAR(255), image VARCHAR(255), PRIMARY KEY (id));',
  function(error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0]);
  }
);

for (let i = 0; i < 100000; i++) {
  const title = faker.lorem.words();
  const date = faker.date.past();
  const author = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const description = faker.lorem.sentence();
  const image = faker.image.imageUrl();
  connection.query(
    `INSERT INTO Books (title,date,author,description,image) VALUES(?,?,?,?,?);`,
    [title, date, author, description, image],
    function(error, results, fields) {
      console.log(this.sql);
      if (error) throw error;
    }
  );
}

connection.end();

