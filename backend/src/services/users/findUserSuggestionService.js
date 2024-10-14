const Sequelize = require('sequelize');
const User = require('../../data/models/User');
const sequelize = require('../../db');


async function findUserSuggestions(userID) {
    try {
        const result = await User.findAll({

            attributes: ['id', 'username', 'name', 'lastname', 'avatar', 'verify_level'],
            where: {
                id: {
                    [Sequelize.Op.notIn]: Sequelize.literal(`(SELECT "followedID" FROM "followers"
                        WHERE "followerID" = ${userID})`),
                    [Sequelize.Op.ne]: userID
                },
            },
            limit: 3,
            order: sequelize.random()
        })


        if (result) {
            return result;

        } else {
            return -2;
        }


    } catch (error) {
        return -1;
    }
}


module.exports = {
    findUserSuggestions
}