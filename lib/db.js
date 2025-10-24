// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('database.db');

const Sequelize = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});

module.exports = db;