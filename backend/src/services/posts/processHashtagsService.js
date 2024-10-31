const { Sequelize } = require('sequelize');
const Hashtag = require('../../data/models/Hashtag');




async function processHashtags(hashtags) {

    try {
        const existingHashtags = await Hashtag.findAll({
            where: { name: hashtags },
            attributes: ['id', 'name', 'count']
        })
        const newHashtags = hashtags.filter((hashtag) => !existingHashtags.some((existingHashtag) => existingHashtag.name === hashtag));
        if (existingHashtags.length > 0) {
            await Hashtag.update({ count: Sequelize.literal('count +1') }, { where: { name: existingHashtags.map(tag => tag.name) } });
        }
        if (newHashtags.length > 0) {
            await Hashtag.bulkCreate(
                newHashtags.map((hashtag) => ({ name: hashtag }))
            )
        }
        return [existingHashtags.length, newHashtags.length];

    } catch (error) {
        return -1;
    }

}

module.exports = {
    processHashtags
}