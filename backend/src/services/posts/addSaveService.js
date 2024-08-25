const Save = require('../../data/models/Save');

async function addSave(id, postID) {

    try {
        const result = await Save.create({

            userID: id,
            postID: postID

        });
        if (result) {

            return result;

        } else {
            return -1;

        }


    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError' && error.parent.constraint === 'unique_user_post_saves') {
            return -2;
        } else {
            return -1;
        };
    }


}

module.exports = {
    addSave
}