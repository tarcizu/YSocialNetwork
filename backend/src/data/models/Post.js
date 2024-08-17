const Sequelize = require('sequelize');
const database = require('../../db');
const User = require('./User');
const Source = require('./Source');


const Post = database.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    content: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(80),
        allowNull: true
    },
    sourceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sources',
            key: 'id'
        },
        onUpdate: 'CASCADE'
    }


})


Post.belongsTo(Source, {
    foreignKey: 'sourceID'
});
Post.belongsTo(User, {
    foreignKey: 'userID'
});
Source.hasMany(Post, {
    foreignKey: 'sourceID'
});

module.exports = Post;