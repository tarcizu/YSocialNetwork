const { findAllPostsbyID } = require('../services/posts/findPostService');


async function findPosts(request, response) {
    const id = request.body.id;

    console.log(`\nRota de Postagens Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);

    const result = await findAllPostsbyID(id);

    if (result === -1) {



        console.log(`Falha ao carregar postagens: Error desconhecido`);
        response.sendStatus(400);

    }
    else if (result === -2) {

        console.log(`Falha ao carregar postagens: Nenhuma postagem encontrada`);
        response.sendStatus(204);


    }
    else {
        console.log(`Postagens carregadas com sucesso: ${result.length} Postagens`);
        response.status(200).json(result)
    }


};



module.exports = {

    findPosts
}