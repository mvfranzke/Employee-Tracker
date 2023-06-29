//import mysql2
const mysql = require("mysql2");

//connectes mysql workbench and database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
});

//returns error
connection.connect(function (err) {
  if (err) throw err;
});

//exports connection to be used in queries.js
module.exports = connection;
