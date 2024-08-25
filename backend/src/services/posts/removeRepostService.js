const Repost = require('../../data/models/Repost');

async function removeRepost(id, postID) {

    try {
        const result = await Repost.destroy({
            where: {
                postID: postID,
                userID: id
            }
        });
        if (result === 0) {

            return -2

        } else {

            return -3
        }


    } catch (error) {

        return -1;

    }


}

module.exports = {
    removeRepost
}