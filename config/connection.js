// Set up database connection
var mysql = require("mysql");
var connection;

// adding in the environment variable option for JAWSDB for heroku
if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'burgers_db'
	});
};

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
