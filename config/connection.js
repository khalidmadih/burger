// Set up database connection
var mysql = require("mysql");
var connection;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "burgers_db"
});

// Establishing the connection
connection.connect(function(err) {
  if (err) {
    console.error("error conencting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// exporting the connection to orm
module.exports = connection;
