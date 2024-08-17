const Post = require('../../data/models/Post');
const User = require('../../data/models/User');
const Source = require('../../data/models/Source');



async function findAllPostsbyID(id) {

    try {

        const result = await Post.findAll({
            raw: true,
            nest: true,
            where: {
                userID: id,
            },
            include: [
                {
                    model: Source,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['username', 'id']
                }
            ],
            attributes: ['id', 'content', 'image', 'createdAt', 'updatedAt'],
        });

        if (result) {
            console.log("Retornou algo");


            return result;
        }
        else {
            console.log("Retornou porra nenhuma");
            return -2;
        }

    } catch (error) {
        return -1
    }
}


module.exports = {
    findAllPostsbyID
}