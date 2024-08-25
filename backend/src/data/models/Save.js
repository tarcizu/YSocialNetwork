const Sequelize = require('sequelize');
const database = require('../../db');
const User = require('./User');
const Post = require('./Post');


const Save = database.define('saves', {
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


Save.belongsTo(User, {
    foreignKey: 'userID',
    as: 'SaveUser'
});
Save.belongsTo(Post, {
    foreignKey: 'postID',
    as: 'SavePost'
});
User.hasMany(Save, {
    foreignKey: 'userID',
    as: 'SaveUser'
});
Post.hasMany(Save, {
    foreignKey: 'postID',
    as: 'SavePost'
});

module.exports = Save;