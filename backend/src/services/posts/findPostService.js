const Sequelize = require('sequelize');
const Post = require('../../data/models/Post');
const User = require('../../data/models/User');
const Source = require('../../data/models/Source');
const Like = require('../../data/models/Like');
const Repost = require('../../data/models/Repost');
const Save = require('../../data/models/Save');



async function findPost(userID, postID, username) {

    try {

        const posts = await Post.findAll({
            raw: true,
            nest: true,
            where:
            {
                id: postID
            },
            include:
                [
                    {
                        model: Source,
                        as: 'PostSource',
                        attributes: ['name']
                    },
                    {
                        model: User,
                        as: 'PostUser',
                        attributes: ['id', 'username', 'name', 'lastname', 'avatar', 'verify_level'],
                        where: {
                            username: username
                        }
                    },
                    {
                        model: Like,
                        as: 'LikePost',
                        attributes: [],
                        duplicating: false
                    },
                    {
                        model: Repost,
                        as: 'RepostPost',
                        attributes: [],
                        duplicating: false
                    },
                    {
                        model: Save,
                        as: 'SavePost',
                        attributes: [],
                        duplicating: false
                    },

                ],
            attributes:
                [
                    'id',
                    'content',
                    'image',
                    'createdAt',
                    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('LikePost.id'))), 'likesCount'],
                    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('RepostPost.id'))), 'repostsCount'],
                    [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('SavePost.id'))), 'savesCount'],
                    [Sequelize.literal(`CASE WHEN ${userID ? `EXISTS (
                        SELECT 1 FROM "likes" WHERE "likes"."postID" = "posts"."id" AND "likes"."userID" = ${userID}
                    )` : 'false'} THEN true ELSE false END`), 'userLiked'],
                    [Sequelize.literal(`CASE WHEN ${userID ? `EXISTS (
                        SELECT 1 FROM "reposts" WHERE "reposts"."postID" = "posts"."id" AND "reposts"."userID" = ${userID}
                    )` : 'false'} THEN true ELSE false END`), 'userReposted'],
                    [Sequelize.literal(`CASE WHEN ${userID ? `EXISTS (
                        SELECT 1 FROM "saves" WHERE "saves"."postID" = "posts"."id" AND "saves"."userID" = ${userID}
                    )` : 'false'} THEN true ELSE false END`), 'userSaved']
                ],
            group: ['posts.id', 'PostSource.name', 'PostUser.id', 'PostUser.username', 'PostUser.name', 'PostUser.lastname', 'PostUser.avatar'],
            order: [['createdAt', 'DESC']]
        });


        if (posts) {
            if (posts.length === 1) {

                return posts;

            }
            else {
                return -2
            }

        }
        else {
            return -1;
        }

    } catch (error) {

        return -1
    }
}


module.exports = {
    findPost
}