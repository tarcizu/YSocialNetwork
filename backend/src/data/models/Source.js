const Sequelize = require('sequelize');
const database = require('../../db');
const Post = require('./Post');



const Source = database.define('sources', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true
    }

});



module.exports = Source;