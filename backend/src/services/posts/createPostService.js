const Post = require('../../data/models/Post');
const User = require('../../data/models/User');
const Source = require('../../data/models/Source');

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
        console.log(`Erro ao criar Postagem:\nCódigo: ${error.parent.code}\n${error.parent.detail}`);
        return -1;

    }

}


module.exports = {
    createNewPost
}