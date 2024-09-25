const Sequelize = require('sequelize');
const Post = require('../../data/models/Post');
const User = require('../../data/models/User');
const Source = require('../../data/models/Source');
const Like = require('../../data/models/Like');
const Repost = require('../../data/models/Repost');
const Save = require('../../data/models/Save');
const Follower = require('../../data/models/Followers');



async function findTimelinebyID(id) {

    try {

        const posts = await Post.findAll({
            raw: true,
            nest: true,

            include: [
                {
                    model: User,
                    as: 'PostUser',
                    attributes: ['id', 'username', 'name', 'lastname', 'avatar', 'verify_level'],
                    required: true,
                    include: [
                        {

                            model: Follower,
                            as: 'Followers',
                            where: {
                                followerID: id
                            },
                            attributes: [],
                            required: false

                        }
                    ]
                },
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

            ],
            attributes: [
                'id',
                'content',
                'image',
                'createdAt',
                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('LikePost.id'))), 'likesCount'],
                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('RepostPost.id'))), 'repostsCount'],
                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('SavePost.id'))), 'savesCount'],
                [Sequelize.literal(`CASE WHEN EXISTS (
                SELECT 1 FROM "likes" WHERE "likes"."postID" = "posts"."id" AND "likes"."userID" = ${id}
            ) THEN true ELSE false END`), 'userLiked'],
                [Sequelize.literal(`CASE WHEN EXISTS (
                SELECT 1 FROM "reposts" WHERE "reposts"."postID" = "posts"."id" AND "reposts"."userID" = ${id}
            ) THEN true ELSE false END`), 'userReposted'],
                [Sequelize.literal(`CASE WHEN EXISTS (
                SELECT 1 FROM "saves" WHERE "saves"."postID" = "posts"."id" AND "saves"."userID" = ${id}
            ) THEN true ELSE false END`), 'userSaved']],
            where: {
                [Sequelize.Op.or]: [
                    {
                        '$PostUser.id$': id,
                    }, {
                        '$PostUser.Followers.followerID$': id
                    }
                ]
            },
            group: ['posts.id', 'PostSource.name', 'PostUser.id', 'PostUser.username', 'PostUser.name', 'PostUser.lastname', 'PostUser.avatar'],
            order: [['createdAt', 'DESC']]
        });







        const reposts = await Repost.findAll({
            raw: true,
            nest: true,

            include:
                [
                    {
                        model: Post,
                        as: 'RepostPost',
                        attributes:
                            [
                                'id',
                                'content',
                                'image',
                                'createdAt',
                                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('RepostPost->LikePost.id'))), 'likesCount'],
                                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('RepostPost->RepostPost.id'))), 'repostsCount'],
                                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('RepostPost->SavePost.id'))), 'savesCount'],
                                [Sequelize.literal(`CASE WHEN EXISTS(SELECT 1 FROM "likes" WHERE "likes"."postID" = "RepostPost"."id" AND "likes"."userID" = ${id}) THEN true ELSE false END`), 'userLiked'],
                                [Sequelize.literal(`CASE WHEN EXISTS(SELECT 1 FROM "reposts" WHERE "reposts"."postID" = "RepostPost"."id" AND "reposts"."userID" = ${id}) THEN true ELSE false END`), 'userReposted'],
                                [Sequelize.literal(`CASE WHEN EXISTS(SELECT 1 FROM "saves" WHERE "saves"."postID" = "RepostPost"."id" AND "saves"."userID" = ${id}) THEN true ELSE false END`), 'userSaved']
                            ],

                        include: [
                            {
                                model: User,
                                as: 'PostUser',
                                attributes: ['id', 'username', 'name', 'lastname', 'avatar', 'verify_level'],
                                required: true,
                                include:
                                    [
                                        {
                                            model: Follower,
                                            as: 'Following',
                                            where: {
                                                followerID: id
                                            },
                                            attributes: [],
                                            required: false

                                        }
                                    ]
                            },
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
                            }

                        ]
                    },
                    {
                        model: User,
                        as: 'RepostUser',
                        attributes: ['id', 'username', 'name', 'lastname', 'avatar'],
                        include: [
                            {
                                model: Follower,
                                as: 'Followers',
                                where:
                                {
                                    followerID: id
                                },
                                attributes: [],
                                required: false

                            }
                        ],
                        required: true
                    }
                ],

            attributes: ['id', 'createdAt'],
            where:
            {
                [Sequelize.Op.or]:
                    [
                        { '$RepostUser.Followers.followerID$': id },
                        { userID: id }
                    ]
            },
            group: ['RepostPost.id', 'RepostPost->PostUser.id', 'RepostPost->PostSource.id', 'reposts.id', 'RepostUser.id'],
            order: [['createdAt', 'DESC']]
        });



        const result = [...posts, ...reposts];
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
    findTimelinebyID
}