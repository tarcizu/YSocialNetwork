const Post = require('../../data/models/Post');

async function removePost(id, postID) {

    try {
        const result = await Post.destroy({
            where: {
                userID: id,
                id: postID
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
    removePost
}