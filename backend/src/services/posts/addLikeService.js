const Like = require('../../data/models/Like');

async function addLike(id, postID) {

    try {
        const result = await Like.create({

            userID: id,
            postID: postID

        });
        if (result) {

            return result;
        } else {

            return -1;
        }


    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError' && error.parent.constraint === 'unique_user_post_likes') {
            return -2;
        } else {
            return -1;
        };
    }


}

module.exports = {
    addLike
}