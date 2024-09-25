require('dotenv').config();
const jwt = require('jsonwebtoken');

function createCookie(id, access_level) {
    const token = jwt.sign({ id: id, access_level: access_level }, process.env.TOKENPASSWORD, {
        expiresIn: process.env.TOKENEXPIRATIONTIME
    });

    const defaultOptions = {
        httpOnly: true,
        secure: true,
        // sameSite: 'Strict',
        sameSite: 'None', //Kept like this for testing
        maxAge: process.env.TOKENEXPIRATIONTIME
    };
    const options = {}

    const cookieOptions = { ...defaultOptions, ...options }
    const cookie = {
        cookieName: 'session_token',
        cookieValue: token,
        cookieOptions: cookieOptions,
    }
    return cookie;
};
function createToken(id) {
    const token = jwt.sign({ id: id }, process.env.TOKENPASSWORD, {
        expiresIn: process.env.TOKENEXPIRATIONTIME
    });

    return token;
};



function validateCookie(request, response, next) {
    const token = request.headers['Authorization'];
    jwt.verify(token, process.env.TOKENPASSWORD, (error, decoded) => {
        if (error) {
            return response.sendStatus(401).end();
        }
        request.body.id = decoded.id;
        request.body.access_level = decoded.access_level;

        next();
    });
};

module.exports = {
    createCookie,
    createToken,
    validateCookie

}