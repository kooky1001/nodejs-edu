var password = require('../password.js');
var mysql = require('mysql');

var db = mysql.createConnection(password.db);
db.connect();

module.exports = db;