const { findAllPostsbyID } = require('../services/posts/findPostsService');
const { createNewPost } = require('../services/posts/createPostService');
const { findTimelinebyID } = require('../services/posts/findTimelineService');
const { findLikedPostsbyID } = require('../services/posts/findLikedPostService');
const { findSavedPostsbyID } = require('../services/posts/findSavedPostService');
const { addLike } = require('../services/posts/addLikeService');
const { removeLike } = require('../services/posts/removeLikeService');
const { addRepost } = require('../services/posts/addRepostService');
const { removeRepost } = require('../services/posts/removeRepostService');
const { addSave } = require('../services/posts/addSaveService');
const { removeSave } = require('../services/posts/removeSaveService');
const { findPost } = require('../services/posts/findPostService');
const { removePost } = require('../services/posts/removePostService');





async function findPosts(request, response) {
    const id = request.body.id;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Postagens Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);
    const result = await findAllPostsbyID(id);
    if (result === -1) {
        console.log(`\nFalha ao carregar postagens: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);

    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar postagens: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(204);
    }
    else {
        console.log(`\nPostagens carregadas com sucesso: ${result.length} Postagens`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(200).json(result)
    }
};

async function createPost(request, response) {
    const id = request.body.id;
    const content = request.body.content;
    const image = request.body.image || null;
    const source = request.body.source;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Criação de Postagem Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nConteúdo: ${content ? content : "[NÃO ENVIADO]"}\nImagem: ${image ? image : "[NÃO ENVIADO]"}\nID da fonte: ${source ? source : "[NÃO ENVIADO]"}\n`);
    const result = await createNewPost(id, content, image, source);
    if (result === -1) {
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else {
        console.log(`\nPostagem criada com sucesso com ID: ${result.id}`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(201).json(result)
    }
};

async function findTimeline(request, response) {
    const id = request.body.id;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Timeline Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);
    const result = await findTimelinebyID(id);
    if (result === -1) {
        console.log(`\nFalha ao carregar timeline: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar timeline: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(204);
    }
    else {
        console.log(`\nTimeline carregada com sucesso: ${result.length} Postagens`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(200).json(result)
    }
};

async function findLikedPosts(request, response) {
    const id = request.body.id;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Postagens Curtidas Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);
    const result = await findLikedPostsbyID(id);
    if (result === -1) {
        console.log(`\nFalha ao carregar postagens curtidas: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar postagens curtidas: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(204);
    }
    else {
        console.log(`\nPostagens Curtidas carregada com sucesso: ${result.length} Postagens`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(200).json(result)
    }
};
async function findSavedPosts(request, response) {
    const id = request.body.id;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Postagens Salvas Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);
    const result = await findSavedPostsbyID(id);
    if (result === -1) {
        console.log(`\nFalha ao carregar postagens salvas: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar postagens salvas: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(204);
    }
    else {
        console.log(`\nPostagens Salvas carregada com sucesso: ${result.length} Postagens`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(200).json(result)
    }
};

async function addLikePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Adicionar Like Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await addLike(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao adicionar like a postagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao adicionar like a postagem: Like já existe`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(409);
    }
    else {
        console.log(`\nLike adicionado com sucesso! com ID ${result.dataValues.id}`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);
    }
};

async function removeLikePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Remover Like Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await removeLike(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao remover like a postagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao remover like a postagem: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    }
    else {
        console.log(`\nLike removido com sucesso!`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);
    }
};

async function addRepostPost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Repostar Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await addRepost(id, postId);
    if (result === -1) {
        console.log(`\nFalha repostar a postagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao repostar a postagem: repostagem já existe`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(409);
    }
    else {
        console.log(`\nPostagem repostada com sucesso! com ID ${result.dataValues.id}`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);
    }
};

async function removeRepostPost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Remover Repostagem Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await removeRepost(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao remover a repostagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao remover a repostagem: Nenhuma repostagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    }
    else {
        console.log(`\nRepostagem removida com sucesso!`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);
    }
};
async function addSavePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Salvar Postagens Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await addSave(id, postId);
    if (result === -1) {
        console.log(`\nFalha salvar a postagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao salvar a postagem: postagem já foi existe`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(409);
    }
    else {
        console.log(`\nPostagem salva com sucesso! com ID ${result.dataValues.id}`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);
    }
};

async function removeSavePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Remover Salvamento de Postagem Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await removeSave(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao remover salvamento de postagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao remover salvamento de postagem: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    }
    else {
        console.log(`\nSalvamento removido com sucesso!`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);
    }
};
async function getPost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    const username = request.params.username;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Postagem:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}\nNome do Usuário: ${username ? username : "[NÃO ENVIADO]"}`);
    const result = await findPost(id, postId, username);
    if (result === -1) {
        console.log(`\nFalha ao obter postagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao obter postagem: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    }
    else {
        console.log(`\nPostagem obtida com sucesso!`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(200).json(result)
    }

};
async function deletePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota remoção de Postagem:\nId do Usuário: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await removePost(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao remover postagem: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao remover postagem: Nenhuma postagem encontrada`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    }
    else {
        console.log(`\nPostagem removida com sucesso!`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);
    }

};



module.exports = {

    findPosts,
    createPost,
    findTimeline,
    findLikedPosts,
    findSavedPosts,
    addLikePost,
    removeLikePost,
    addRepostPost,
    removeRepostPost,
    addSavePost,
    removeSavePost,
    getPost,
    deletePost
}