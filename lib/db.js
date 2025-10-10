// mysql
// var password = require('../password.js');
// var mysql = require('mysql');
//
// var db = mysql.createConnection(password.db);
// db.connect();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db');

module.exports = db;