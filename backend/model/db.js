const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'av3_fmds',
  port: 3306,
  password: 'root',
});

connection.addListener('error', (err) => {
  console.log(err);
});

module.exports = connection;