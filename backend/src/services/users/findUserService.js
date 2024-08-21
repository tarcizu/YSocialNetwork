const Sequelize = require('sequelize');
const User = require('../../data/models/User');
const Follower = require('../../data/models/Followers');

async function findUserbyUsername(username) {
    try {
        const result = await User.findOne({ where: { username: username } })

        if (result) {
            return result.dataValues;

        } else {
            return -2;
        }


    } catch (error) {
        return -1;
    }
}
async function findUserbyID(id) {


    try {
        const result = await User.findByPk(id, {
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM followers AS f
                            WHERE f."followerID" = users.id
                        )`),
                        'followingCount'
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM followers AS f
                            WHERE f."followedID" = users.id
                        )`),
                        'followerCount'
                    ]
                ]
            }
        });
        if (result) {
            return result.dataValues;
        } else {
            return -2;
        }
    } catch (error) {
        return -1;
    }
}

module.exports = {
    findUserbyUsername,
    findUserbyID
}