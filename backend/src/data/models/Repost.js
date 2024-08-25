const Sequelize = require('sequelize');
const database = require('../../db');
const User = require('./User');
const Post = require('./Post');


const Repost = database.define('reposts', {
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


Repost.belongsTo(User, {
    foreignKey: 'userID',
    as: 'RepostUser'
});
Repost.belongsTo(Post, {
    foreignKey: 'postID',
    as: 'RepostPost'
});
User.hasMany(Repost, {
    foreignKey: 'userID',
    as: 'RepostUser'
});
Post.hasMany(Repost, {
    foreignKey: 'postID',
    as: 'RepostPost'
});

module.exports = Repost;