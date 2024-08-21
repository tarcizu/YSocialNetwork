const { findAllPostsbyID } = require('../services/posts/findPostService');
const { createNewPost } = require('../services/posts/createPostService');




async function findPosts(request, response) {
    const id = request.body.id;

    console.log(`\nRota de Postagens Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);

    const result = await findAllPostsbyID(id);

    if (result === -1) {



        console.log(`\nFalha ao carregar postagens: Error desconhecido`);
        response.sendStatus(400);

    }
    else if (result === -2) {

        console.log(`\nFalha ao carregar postagens: Nenhuma postagem encontrada`);
        response.sendStatus(204);


    }
    else {
        console.log(`\nPostagens carregadas com sucesso: ${result.length} Postagens`);
        response.status(200).json(result)
    }


};

async function createPost(request, response) {
    const id = request.body.id;
    const content = request.body.content;
    const image = request.body.image || null;
    const source = request.body.source;
    console.log(`\nRota de Criação de Postagem Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nConteúdo: ${content ? content : "[NÃO ENVIADO]"}\nImagem: ${image ? image : "[NÃO ENVIADO]"}\nID da fonte: ${source ? source : "[NÃO ENVIADO]"}\n`);

    const result = await createNewPost(id, content, image, source);

    if (result === -1) {
        response.sendStatus(400);
    }
    else {
        console.log(`\nPostagem criada com sucesso com ID: ${result.id}`);
        response.status(201).json(result)
    }


}



module.exports = {

    findPosts,
    createPost
}