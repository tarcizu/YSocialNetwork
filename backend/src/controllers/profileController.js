
const { findAllOtherUserPostsbyID } = require("../services/posts/findOtherUserPostService");
const { findAllPostsbyID } = require("../services/posts/findPostService");
const { findUserbyUsername, findOtherUserbyUsername } = require("../services/users/findUserService");

async function getProfile(request, response) {
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`\nRota de Perfil Acessada:\nUsername: ${request.params.username ? request.params.username : "[NÃO ENVIADO]"}\n`);

    const username = request.params.username;
    const userID = request.body.otherUserID;
    console.log(`User ID Detectado: ${userID}`);

    const result = await findUserbyUsername(username, userID);

    if (result === -2) {
        console.log(`Falha ao buscar perfil: Usuário não encontrado`);
        console.log("---------------------------------------------");
        response.sendStatus(404);

    } else if (result === -1) {
        console.log(`Falha ao buscar perfil: Error desconhecido`);
        console.log("---------------------------------------------");
        response.sendStatus(400);

    } else {
        const { password, updatedAt, ...userDate } = result;
        console.log("Usuário retornado com sucesso com o id: " + result.id);
        console.log("---------------------------------------------");
        response.status(201).json({ ...userDate });

    }


};
async function getTimeline(request, response) {
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`\nRota de Postagens de Acessada :\nID: ${request.params.id ? request.params.id : "[NÃO ENVIADO]"}\n`);

    const id = request.params.id;
    const otherUserID = request.body.otherUserID;
    console.log(`Recebeu o usuario: ${otherUserID}`);

    const result = await findAllOtherUserPostsbyID(id, otherUserID);

    if (result === -1) {
        console.log(`\nFalha ao carregar timeline: Error desconhecido`);
        console.log("---------------------------------------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar timeline: Nenhuma postagem encontrada`);
        console.log("---------------------------------------------");
        response.sendStatus(204);
    }
    else {
        console.log(`\nTimeline carregada com sucesso: ${result.length} Postagens`);
        console.log("---------------------------------------------");
        response.status(200).json(result)
    }


};




module.exports = {

    getProfile,
    getTimeline
}