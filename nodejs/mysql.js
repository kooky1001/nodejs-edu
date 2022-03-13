var password = require('../password.js');
var ssh = require('../lib/ssh');
var mysql = require('mysql');

var connection = mysql.createConnection(password.db);
connection.connect();
connection.query('select * from topic', function(error, results, fields) {
    if (error) throw error;
    console.log(results);
});
connection.end();
//ssh.close();