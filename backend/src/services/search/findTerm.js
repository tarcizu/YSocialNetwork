const Sequelize = require('sequelize');
const User = require('../../data/models/User');
const Post = require('../../data/models/Post');
const Source = require('../../data/models/Source');
const Like = require('../../data/models/Like');
const Repost = require('../../data/models/Repost');
const Save = require('../../data/models/Save');





async function findTerm(userID, term) {



    try {

        const posts = await Post.findAll({
            raw: true,
            nest: true,
            where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('content')), {
                [Sequelize.Op.like]: `%${term.toLowerCase()}%`
            }),


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
                        attributes: ['id', 'username', 'name', 'lastname', 'avatar', 'verify_level']
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
                    [Sequelize.literal(`CASE WHEN EXISTS (
                SELECT 1 FROM "likes" WHERE "likes"."postID" = "posts"."id" AND "likes"."userID" = ${userID}
            ) THEN true ELSE false END`), 'userLiked'],
                    [Sequelize.literal(`CASE WHEN EXISTS (
                SELECT 1 FROM "reposts" WHERE "reposts"."postID" = "posts"."id" AND "reposts"."userID" = ${userID}
            ) THEN true ELSE false END`), 'userReposted'],
                    [Sequelize.literal(`CASE WHEN EXISTS (
                SELECT 1 FROM "saves" WHERE "saves"."postID" = "posts"."id" AND "saves"."userID" = ${userID}
            ) THEN true ELSE false END`), 'userSaved']
                ],
            group: ['posts.id', 'PostSource.name', 'PostUser.id', 'PostUser.username', 'PostUser.name', 'PostUser.lastname', 'PostUser.avatar'],
            order: [
                [Sequelize.literal(`CASE 
                    WHEN LOWER(content) LIKE LOWER('${term}') THEN 1
                    WHEN content ~* '\\m${term}\\M' THEN 2
                     WHEN LOWER(content) LIKE LOWER('${term}%')  THEN 3
                     ELSE 4 
                     END`), 'ASC'],
                ['createdAt', 'DESC']
            ]
        });


        const profiles = await User.findAll({
            raw: true,
            nest: true,
            where: {
                [Sequelize.Op.or]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('username')), {
                        [Sequelize.Op.like]: `%${term.toLowerCase()}%`
                    }),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.fn('concat', Sequelize.col('name'), ' ', Sequelize.col('lastname'))), {
                        [Sequelize.Op.like]: `%${term.toLowerCase()}%`
                    }),

                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), {
                        [Sequelize.Op.like]: `%${term.toLowerCase()}%`
                    }),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('bio')), {
                        [Sequelize.Op.like]: `%${term.toLowerCase()}%`
                    }),

                ]

            },
            attributes: {
                include:
                    [
                        [
                            Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM followers AS f
                        WHERE f."followerID" = users.id
                    )`),
                            'followingCount'
                        ],
                        [
                            Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM followers AS f
                        WHERE f."followedID" = users.id
                    )`),
                            'followerCount'
                        ],
                        [
                            Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM posts AS p
                        WHERE p."userID" = users.id
                    )`),
                            'postCount'
                        ],
                        [
                            Sequelize.literal(`
                            EXISTS (
                              SELECT 1
                              FROM followers AS f
                              WHERE f."followerID" = ${userID}
                              AND f."followedID" = users.id
                            )`),
                            'isFollowed'
                        ]


                    ]
            },
            order: [
                [Sequelize.literal(`CASE 
                        WHEN LOWER(username) LIKE LOWER ('${term}') THEN 1
                        WHEN LOWER(email) LIKE LOWER ('${term}') THEN 2
                        WHEN LOWER(CONCAT(name, ' ', lastname)) LIKE LOWER ('${term}') THEN 3
                        WHEN LOWER(name) LIKE LOWER ('${term}') THEN 4
                        WHEN lastname ~* '\\m${term}\\M' THEN 5
                        WHEN LOWER(CONCAT(name, ' ', lastname)) LIKE LOWER ('%${term}%') THEN 6                            
                        WHEN bio ~* '\\m${term}\\M' THEN 7                         
                        ELSE 8
                    END`), 'ASC'],
                ['createdAt', 'ASC']

            ],
            limit: 3

        }

        )


        const result = {
            profiles: profiles.map(profile => ({ ...profile })),
            posts: posts.map(post => ({ ...post }))
        }


        if (result.posts.length !== 0 || result.profiles.length !== 0) {

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
    findTerm
}



