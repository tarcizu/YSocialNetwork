const Sequelize = require('sequelize');
const Post = require('../../data/models/Post');
const User = require('../../data/models/User');
const Source = require('../../data/models/Source');
const Like = require('../../data/models/Like');
const Repost = require('../../data/models/Repost');
const Save = require('../../data/models/Save');



async function findLikedPostsbyID(id) {

    try {

        const result = await Like.findAll({
            raw: true,
            nest: true,
            where:
            {
                userID: id,
            },
            include: [
                {
                    model: Post,
                    as: 'LikePost',
                    attributes: [
                        'id',
                        'content',
                        'image',
                        'createdAt',
                        [Sequelize.fn('COUNT', Sequelize.col('LikePost->LikePost')), 'likesCount'],
                        [Sequelize.fn('COUNT', Sequelize.col('LikePost->RepostPost')), 'repostsCount'],
                        [Sequelize.fn('COUNT', Sequelize.col('LikePost->SavePost')), 'savesCount'],
                        [Sequelize.literal(`CASE WHEN EXISTS(SELECT 1 FROM "likes" WHERE "likes"."postID" = "LikePost"."id" AND "likes"."userID" = ${id}) THEN true ELSE false END`), 'userLiked'],
                        [Sequelize.literal(`CASE WHEN EXISTS(SELECT 1 FROM "reposts" WHERE "reposts"."postID" = "LikePost"."id" AND "reposts"."userID" = ${id}) THEN true ELSE false END`), 'userReposted'],
                        [Sequelize.literal(`CASE WHEN EXISTS(SELECT 1 FROM "saves" WHERE "saves"."postID" = "LikePost"."id" AND "saves"."userID" = ${id}) THEN true ELSE false END`), 'userSaved']
                    ],
                    include:
                        [
                            {
                                model: Source,
                                as: 'PostSource',
                                attributes: ['name']
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
                            {
                                model: User,
                                as: 'PostUser',
                                attributes: ['id', 'username', 'name', 'lastname', 'avatar']
                            }
                        ]
                },
                {
                    model: User,
                    as: 'LikeUser',
                    attributes: ['id', 'username', 'name', 'lastname', 'avatar']
                }
            ],
            attributes: ['id', 'createdAt'],
            group: ['likes.id', 'LikePost.id', 'LikePost->PostSource.id', 'LikePost->PostUser.id', 'LikeUser.id'],
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
    findLikedPostsbyID
}