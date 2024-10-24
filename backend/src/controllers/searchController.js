const { findHashtag } = require("../services/search/findHashtag");
const { findTerm } = require("../services/search/findTerm");




async function searchTerm(request, response) {
    const userID = request.body.id;
    const term = request.body.term;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Busca acessada:\nID do Usuário: ${userID ? userID : "[NÃO ENVIADO]"}\nTermo Buscado: ${term ? term : "[NÃO ENVIADO]"}`);
    const result = await findTerm(userID, term);

    if (result === -1) {
        console.log(`\nFalha buscar termo: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    } else if (result === -2) {
        console.log(`\nFalha buscar termo: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    } else {
        console.log(`\nBusca de Termo realizada com sucesso: ${result.length} Postagens`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(200).json(result);
    }

}

async function searchHashtag(request, response) {
    const userID = request.body.id;
    const hashtag = request.body.hashtag;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Busca por Hashtag acessada:\nID do Usuário: ${userID ? userID : "[NÃO ENVIADO]"}\nHashtag: ${hashtag ? hashtag : "[NÃO ENVIADO]"}`);

    const result = await findHashtag(userID, hashtag);
    if (result === -1) {
        console.log(`\nFalha buscar hashtag: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    } else if (result === -2) {
        console.log(`\nFalha buscar hashtag: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    } else {
        console.log(`\nBusca de Hashtag realizada com sucesso: ${result.length} Postagens`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(200).json(result);
    }



}

module.exports = {


    searchTerm,
    searchHashtag
}