//import mysql2
const mysql = require("mysql2");

//create connection in mysql workbench
const connection = mysql.createConnection({
  host: "localhost",
  user: "host",
  password: "password",
  database: "employees_db"
});


