var password = require('../password.js');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : password.host,
    user : password.user,
    password : password.password,
    database : password.database
});

connection.connect();

connection.query('select * from topic', function(error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();