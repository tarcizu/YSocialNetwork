const Repost = require('../../data/models/Repost');

async function addRepost(id, postID) {

    try {
        const result = await Repost.create({

            userID: id,
            postID: postID

        });
        if (result) {

            return result;
        } else {
            return -1;
        }


    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError' && error.parent.constraint === 'unique_user_post_reposts') {
            return -2;
        } else {
            return -1;
        };
    }


}

module.exports = {
    addRepost
}