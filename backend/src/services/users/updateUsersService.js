const User = require('../../data/models/User');

async function updateUserProfile(userID, updateData) {

    try {
        const result = await User.update(updateData, {
            where: {
                id: userID
            }
        });
        return -2;

    } catch (error) {

        console.log(error);

        if (error.name === 'SequelizeUniqueConstraintError' && error.parent.constraint === 'users_email_key') {
            console.log("Email já existe");
            return -3

        }
        else {
            return -1
        }


    }
}
async function updateUserPassword(userID, newPassword) {

    try {
        const result = await User.update({ password: newPassword }, {
            where: {
                id: userID
            }
        });
        return -2;

    } catch (error) {

        return -1



    }
}




module.exports = {
    updateUserProfile,
    updateUserPassword
}