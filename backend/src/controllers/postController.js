const { findAllPostsbyID } = require('../services/posts/findPostService');
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
};

async function findTimeline(request, response) {
    const id = request.body.id;
    console.log(`\nRota de Timeline Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);
    const result = await findTimelinebyID(id);
    if (result === -1) {
        console.log(`\nFalha ao carregar timeline: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar timeline: Nenhuma postagem encontrada`);
        response.sendStatus(204);
    }
    else {
        console.log(`\nTimeline carregada com sucesso: ${result.length} Postagens`);
        response.status(200).json(result)
    }
};

async function findLikedPosts(request, response) {
    const id = request.body.id;
    console.log(`\nRota de Postagens Curtidas Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);
    const result = await findLikedPostsbyID(id);
    if (result === -1) {
        console.log(`\nFalha ao carregar postagens curtidas: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar postagens curtidas: Nenhuma postagem encontrada`);
        response.sendStatus(204);
    }
    else {
        console.log(`\nPostagens Curtidas carregada com sucesso: ${result.length} Postagens`);
        response.status(200).json(result)
    }
};
async function findSavedPosts(request, response) {
    const id = request.body.id;
    console.log(`\nRota de Postagens Salvas Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\n`);
    const result = await findSavedPostsbyID(id);
    if (result === -1) {
        console.log(`\nFalha ao carregar postagens salvas: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao carregar postagens salvas: Nenhuma postagem encontrada`);
        response.sendStatus(204);
    }
    else {
        console.log(`\nPostagens Salvas carregada com sucesso: ${result.length} Postagens`);
        response.status(200).json(result)
    }
};

async function addLikePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log(`\nRota de Adicionar Like Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await addLike(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao adicionar like a postagem: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao adicionar like a postagem: Like já existe`);
        response.sendStatus(409);
    }
    else {
        console.log(`\nLike adicionado com sucesso! com ID ${result.dataValues.id}`);
        response.sendStatus(200);
    }
};

async function removeLikePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log(`\nRota de Remover Like Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await removeLike(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao remover like a postagem: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao remover like a postagem: Nenhuma postagem encontrada`);
        response.sendStatus(404);
    }
    else {
        console.log(`\nLike removido com sucesso!`);
        response.sendStatus(200);
    }
};

async function addRepostPost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log(`\nRota de Repostar Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await addRepost(id, postId);
    if (result === -1) {
        console.log(`\nFalha repostar a postagem: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao repostar a postagem: repostagem já existe`);
        response.sendStatus(409);
    }
    else {
        console.log(`\nPostagem repostada com sucesso! com ID ${result.dataValues.id}`);
        response.sendStatus(200);
    }
};

async function removeRepostPost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log(`\nRota de Remover Repostagem Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await removeRepost(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao remover a repostagem: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao remover a repostagem: Nenhuma repostagem encontrada`);
        response.sendStatus(404);
    }
    else {
        console.log(`\nRepostagem removida com sucesso!`);
        response.sendStatus(200);
    }
};
async function addSavePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log(`\nRota de Salvar Postagens Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await addSave(id, postId);
    if (result === -1) {
        console.log(`\nFalha salvar a postagem: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao salvar a postagem: postagem já foi existe`);
        response.sendStatus(409);
    }
    else {
        console.log(`\nPostagem salva com sucesso! com ID ${result.dataValues.id}`);
        response.sendStatus(200);
    }
};

async function removeSavePost(request, response) {
    const id = request.body.id;
    const postId = request.params.postID;
    console.log(`\nRota de Remover Salvamento de Postagem Acessada:\nId: ${id ? id : "[NÃO ENVIADO]"}\nId da Postagem: ${postId ? postId : "[NÃO ENVIADO]"}`);
    const result = await removeSave(id, postId);
    if (result === -1) {
        console.log(`\nFalha ao remover salvamento de postagem: Error desconhecido`);
        response.sendStatus(400);
    }
    else if (result === -2) {
        console.log(`\nFalha ao remover salvamento de postagem: Nenhuma postagem encontrada`);
        response.sendStatus(404);
    }
    else {
        console.log(`\nSalvamento removido com sucesso!`);
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
    removeSavePost
}