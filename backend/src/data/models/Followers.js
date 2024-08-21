const Sequelize = require('sequelize');
const database = require('../../db');
const User = require('./User');


const Follower = database.define('followers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    followerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    followedID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }


})


Follower.belongsTo(User, {
    foreignKey: 'followerID',
    as: 'Follower'
});
Follower.belongsTo(User, {
    foreignKey: 'followedID',
    as: 'Followed'
});
User.hasMany(Follower, {
    foreignKey: 'followerID',
    as: 'Following'
});
User.hasMany(Follower, {
    foreignKey: 'followedID',
    as: 'Followers'
});

module.exports = Follower;