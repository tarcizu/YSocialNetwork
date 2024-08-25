const Save = require('../../data/models/Save');

async function removeSave(id, postID) {

    try {
        const result = await Save.destroy({
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
    removeSave
}