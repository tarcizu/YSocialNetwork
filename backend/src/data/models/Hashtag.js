const Sequelize = require('sequelize');
const database = require('../../db');


const Hashtag = database.define('hashtags', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
})

module.exports = Hashtag;