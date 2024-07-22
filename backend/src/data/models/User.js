const Sequelize = require('sequelize');
const database = require('../../db');


const User = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING(50)
    },
    lastname: {
        type: Sequelize.STRING(100)
    },
    avatar: {
        type: Sequelize.STRING(100)
    },
    access_level: {
        type: Sequelize.SMALLINT,
        defaultValue: '1'
    }


})
module.exports = User;