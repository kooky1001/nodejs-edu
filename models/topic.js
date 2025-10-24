const {DataTypes} = require('sequelize');
const db = require('../lib/db');
const User = require('./user');

const Topic = db.define(
    'Topic',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize: db,
        timestamps: true,
        underscored: true,
    }
);

// Topic.belongsTo(User, {constraints: false});

module.exports = Topic;