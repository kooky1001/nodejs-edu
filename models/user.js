const {DataTypes} = require('sequelize');
const db = require('../lib/db');
const Topic = require('./topic');

const User = db.define(
    'User',
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        sequelize: db,
        timestamps: true,
        underscored: true,
    }
);

// User.hasMany(Topic);

module.exports = User;