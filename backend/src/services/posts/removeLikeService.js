const Like = require('../../data/models/Like');

async function removeLike(id, postID) {

    try {
        const result = await Like.destroy({
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
    removeLike
}