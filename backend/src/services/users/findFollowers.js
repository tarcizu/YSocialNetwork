const Sequelize = require('sequelize');
const Followers = require('../../data/models/Followers');
const User = require('../../data/models/User');




async function findFollowersByID(userID, otherUserID) {

    try {

        const result = await Followers.findAll({
            raw: true,
            nest: true,
            where:
            {
                followedID: otherUserID,
            },
            include: [
                {
                    model: User,
                    as: 'Follower',
                    attributes: ['id', 'username', 'name', 'lastname', 'avatar', 'verify_level'],

                }
            ],
            attributes: {

                include: [[
                    Sequelize.literal(`(
                        SELECT CASE
                        WHEN EXISTS (
                            SELECT 1
                            FROM "followers" AS f 
                            WHERE f."followerID" = ${userID} 
                            AND f."followedID" = "followers"."followerID"
                        )
                        THEN true
                        ELSE false
                    END
                    )`),
                    'isFollowed'
                ]]
            }


        });


        if (result) {

            return result;
        }
        else {
            return -2;
        }

    } catch (error) {
        console.log(error);

        return -1
    }
}


module.exports = {
    findFollowersByID
}