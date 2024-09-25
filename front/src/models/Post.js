import { addLike } from "../services/post/addLikeService";
import { addRepost } from "../services/post/addRepostService";
import { addSave } from "../services/post/addSaveService";
import { removeLike } from "../services/post/removeLikeService";
import { removeRepost } from "../services/post/removeRepostService";
import { removeSave } from "../services/post/removeSaveService";

function createPost(data, access_token) {


    const post = {};


    if (data.RepostPost) {

        post.isRepost = true;
        post.repostID = data.id;
        post.id = data.RepostPost.id;
        post.author = {
            id: data.RepostPost.PostUser.id,
            username: data.RepostPost.PostUser.username,
            fullname: `${data.RepostPost.PostUser.name} ${data.RepostPost.PostUser.lastname}`,
            avatar: data.RepostPost.PostUser.avatar ? data.RepostPost.PostUser.avatar : 'https://i.ibb.co/R03Zw8q/Male.png',
            verify_level: data.RepostPost.PostUser.verify_level
        };
        post.repostAuthor = {
            id: data.RepostUser.id,
            username: data.RepostUser.username,
            fullname: `${data.RepostUser.name} ${data.RepostUser.lastname}`,
        };
        post.content = data.RepostPost.content;
        post.image = data.RepostPost.image;
        post.source = data.RepostPost.PostSource.name;
        post.createdData = data.RepostPost.createdAt;
        post.likes = parseInt(data.RepostPost.likesCount);
        post.reposts = parseInt(data.RepostPost.repostsCount);
        post.hasLiked = data.RepostPost.userLiked;
        post.hasReposted = data.RepostPost.userReposted;
        post.hasSaved = data.RepostPost.userSaved;


    } else if (data.LikePost) {

        post.isRepost = false;
        post.id = data.LikePost.id;
        post.author = {
            id: data.LikePost.PostUser.id,
            username: data.LikePost.PostUser.username,
            fullname: `${data.LikePost.PostUser.name} ${data.LikePost.PostUser.lastname}`,
            avatar: data.LikePost.PostUser.avatar ? data.LikePost.PostUser.avatar : 'https://i.ibb.co/R03Zw8q/Male.png',
            verify_level: data.LikePost.PostUser.verify_level
        };
        post.content = data.LikePost.content;
        post.image = data.LikePost.image;
        post.source = data.LikePost.PostSource.name;
        post.createdData = data.LikePost.createdAt;
        post.likes = parseInt(data.LikePost.likesCount);
        post.reposts = parseInt(data.LikePost.repostsCount);
        post.hasLiked = data.LikePost.userLiked;
        post.hasReposted = data.LikePost.userReposted;
        post.hasSaved = data.LikePost.userSaved;


    } else if (data.SavePost) {

        post.isRepost = false;
        post.id = data.SavePost.id;
        post.author = {
            id: data.SavePost.PostUser.id,
            username: data.SavePost.PostUser.username,
            fullname: `${data.SavePost.PostUser.name} ${data.SavePost.PostUser.lastname}`,
            avatar: data.SavePost.PostUser.avatar ? data.SavePost.PostUser.avatar : 'https://i.ibb.co/R03Zw8q/Male.png',
            verify_level: data.SavePost.PostUser.verify_level
        };
        post.content = data.SavePost.content;
        post.image = data.SavePost.image;
        post.source = data.SavePost.PostSource.name;
        post.createdData = data.SavePost.createdAt;
        post.likes = parseInt(data.SavePost.likesCount);
        post.reposts = parseInt(data.SavePost.repostsCount);
        post.hasLiked = data.SavePost.userLiked;
        post.hasReposted = data.SavePost.userReposted;
        post.hasSaved = data.SavePost.userSaved;


    }
    else {

        post.isRepost = false;
        post.id = data.id;
        post.author = {
            id: data.PostUser.id,
            username: data.PostUser.username,
            fullname: `${data.PostUser.name} ${data.PostUser.lastname}`,
            avatar: data.PostUser.avatar ? data.PostUser.avatar : 'https://i.ibb.co/R03Zw8q/Male.png',
            verify_level: data.PostUser.verify_level
        };
        post.content = data.content;
        post.image = data.image;
        post.source = data.PostSource.name;
        post.createdData = data.createdAt;
        post.likes = parseInt(data.likesCount);
        post.reposts = parseInt(data.repostsCount);
        post.hasLiked = data.userLiked;
        post.hasReposted = data.userReposted;
        post.hasSaved = data.userSaved;

    }

    post.addLike = async function () {
        const result = await addLike(access_token, this.id);
        if (result === -2) {
            console.log("Postagem Curtida!");
            return true;
        }
        else {
            console.log("Postagem já havia sido curtida!");
            return false;
        }
    };

    post.removeLike = async function () {
        const result = await removeLike(access_token, this.id);
        if (result === -2) {
            console.log("Curtida Removida!");
            return true;
        }
        else {
            console.log("Postagem já não era curtida");
            return false;
        }
    };

    post.addRepost = async function () {
        const result = await addRepost(access_token, this.id);
        if (result === -2) {
            console.log("Repostagem Efetuada!");
            return true;
        }
        else {
            console.log("Postagem já havia sido repostada!");
            return false;
        }
    };

    post.removeRepost = async function () {
        const result = await removeRepost(access_token, this.id);
        if (result === -2) {
            console.log("Repostagem Removida!");
            return true;
        }
        else {
            console.log("Repostagem já não existia");
            return false;
        }
    };

    post.addSave = async function () {
        const result = await addSave(access_token, this.id);
        if (result === -2) {
            console.log("Postagem Salva!");
            return true;
        }
        else {
            console.log("Postagem já havia sido salva!");
            return false;
        }
    };

    post.removeSave = async function () {
        const result = await removeSave(access_token, this.id);
        if (result === -2) {
            console.log("Salvamento removido!");
            return true;
        }
        else {
            console.log("Salvamento já não existia");
            return false;
        }
    };

    return post;

}
export default createPost;