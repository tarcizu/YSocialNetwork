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
                    attributes: ['id', 'username', 'name', 'lastname', 'avatar']
                }
            ],
            attributes: ['id', 'content', 'image', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        if (result) {

            return result;
        }
        else {
            return -2;
        }

    } catch (error) {
        return -1
    }
}


module.exports = {
    findAllPostsbyID
}