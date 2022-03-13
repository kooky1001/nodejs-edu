var password = require('../password.js');
var tunnel = require('tunnel-ssh');
var mysql = require('mysql');

var ssh = tunnel(password.ssh, function(error, server){
    if(error) throw error;
});
var connection = mysql.createConnection(password.db);
    connection.connect();

    connection.query('select * from topic', function(error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
    connection.end();
ssh.close();