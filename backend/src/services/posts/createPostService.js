const Post = require('../../data/models/Post');


async function createNewPost(userId, content, image, sourceId) {
    try {
        const result = await Post.create({
            userID: userId,
            content: content,
            image: image,
            sourceID: sourceId

        })
        if (result) {
            return result;
        }
        else {
            return -1
        }



    } catch (error) {
        return -1;

    }

}


module.exports = {
    createNewPost
}