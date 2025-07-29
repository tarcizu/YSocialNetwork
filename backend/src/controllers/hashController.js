const bcrypt = require('bcryptjs');

async function createHash(password) {
    try {
        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function (error, hash) {
                if (error) reject(error);
                resolve(hash)
            });
        });
        return hash
    } catch (error) {
        console.log(error);
    }
}
async function validateHash(password, hashPassword) {
    try {
        const validate = await new Promise((resolve, reject) => {
            bcrypt.compare(password, hashPassword, function (error, result) {
                if (error) reject(error)
                resolve(result)
            });
        });
        return validate;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createHash,
    validateHash
}