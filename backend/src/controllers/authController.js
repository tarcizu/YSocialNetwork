const { findUserbyID } = require("../services/users/findUserService");

async function auth(request, response) {
    console.log(`\nRota Auth Acessada:\nId: ${request.body.id ? request.body.id : "[NÃO ENVIADO]"}\n`);

    const id = request.body.id;
    const result = await findUserbyID(id);
    const { password, updatedAt, ...userDate } = result;
    response.status(201).json({ ...userDate })



};



module.exports = auth;