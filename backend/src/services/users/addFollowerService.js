const Followers = require('../../data/models/Followers');

async function addFollower(followedID, followerID) {

    try {
        const result = await Followers.create({
            followerID: followerID,
            followedID: followedID
        });
        if (result) {
            return -2;
        } else {
            return -1;
        }

    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError' && error.parent.constraint === 'unique_follower_followed_followers') {

            return -3;

        }
        else {
            return -1;
        }

    }

}

module.exports = {
    addFollower
}