const Sequelize = require('sequelize');
const database = require('../../db');
const User = require('./User');
const Post = require('./Post');


const Like = database.define('likes', {
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
    postID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }


})


Like.belongsTo(User, {
    foreignKey: 'userID',
    as: 'LikeUser'

});
Like.belongsTo(Post, {
    foreignKey: 'postID',
    as: 'LikePost'
});
User.hasMany(Like, {
    foreignKey: 'userID',
    as: 'LikeUser'
});
Post.hasMany(Like, {
    foreignKey: 'postID',
    as: 'LikePost'
});

module.exports = Like;