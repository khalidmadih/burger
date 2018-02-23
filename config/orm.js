// importing in the connection to our database
var connection = require('../config/connection.js');

// this function will be used to build queries
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

// this is another function for building queries
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

// defining the orm that will be exported to the model
var orm = {
	// selectAll function for grabbing everything
	selectAll: function (tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			// send the query result back to the callback function
			cb(result);
		});
	},
	// insertOne function for inserting one burger into table
	insertOne: function (table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

		// console.log(queryString);
		// console.log(vals);

		connection.query(queryString, vals, function (err, result) {
			if (err) throw err;
			// send the query result back to the callback function
			cb(result);
		});
	},

	// updating function for changing a burger status
	updateOne: function (table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function (err, result) {
			if (err) throw err;
			// send the query result back to the callback function
			cb(result);
		});
	}
};

// exporting the orm back to the model
module.exports = orm;