const { findUserbyID } = require("../services/users/findUserService");

async function auth(request, response) {
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota Auth Acessada:\nId: ${request.body.id ? request.body.id : "[NÃO ENVIADO]"}\n`);

    const id = request.body.id;
    const result = await findUserbyID(id);
    const { password, updatedAt, ...userDate } = result;
    console.log("-----------------ROUTE ENDED-----------------");
    response.status(201).json({ ...userDate });




};



module.exports = auth;