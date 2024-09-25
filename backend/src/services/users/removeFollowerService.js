const Followers = require('../../data/models/Followers');

async function removeFollower(followedID, followerID) {

    try {
        const result = await Followers.destroy({
            where: {
                followerID: followerID,
                followedID: followedID
            }

        });
        if (result === 0) {
            return -2;
        } else {
            return -3;
        }

    } catch (error) {

        return -1;

    }

}

module.exports = {
    removeFollower
}