const User = require('../../data/models/User');

async function createUser(user) {

    try {
        const result = await User.create(user);
        return result.dataValues;

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError' && error.parent.constraint === 'users_username_key') {

            return -2;
        }
        else if (error.name === 'SequelizeUniqueConstraintError' && error.parent.constraint === 'users_email_key') {

            return -3;
        }
        else {
            return -1;

        }

    }


}

module.exports = {
    createUser
}