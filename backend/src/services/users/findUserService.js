const User = require('../../data/models/User');

async function findUserbyUsername(username) {
    try {
        const result = await User.findOne({ where: { username: username } })

        if (result) {
            return result.dataValues;

        } else {
            return -2;
        }


    } catch (error) {
        return -1;
    }
}
async function findUserbyID(id) {
    try {
        const result = await User.findByPk(id);
        if (result) {
            return result.dataValues;
        } else {
            return -2;
        }
    } catch (error) {
        return -1;
    }
}

module.exports = {
    findUserbyUsername,
    findUserbyID
}