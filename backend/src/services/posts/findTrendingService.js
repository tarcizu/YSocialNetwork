const Hashtag = require('../../data/models/Hashtag');




async function findTrending() {

    try {

        const result = await Hashtag.findAll({
            raw: true,
            nest: true,
            attributes:
                [
                    'id',
                    'name',
                    'count',
                    'updatedAt'

                ],
            order: [['count', 'DESC'], ['updatedAt', 'DESC']],
            limit: 10
        });


        if (result) {
            return result;
        }
        else {
            return -1;
        }

    } catch (error) {
        return -1
    }
}


module.exports = {
    findTrending
}