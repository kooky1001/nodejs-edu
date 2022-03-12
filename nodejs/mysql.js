var password = require('../password.js');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : password.db.host,
    user : password.db.user,
    password : password.db.password,
    database : password.db.database
});

connection.connect();

connection.query('select * from topic', function(error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();