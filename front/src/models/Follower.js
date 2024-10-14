import { addFollower } from "../services/user/addFollowerService";
import { removeFollower } from "../services/user/removeFollowerService";

function createFollow(data, access_token) {
    const follow = {};



    follow.id = data.id || null;
    follow.followerID = data.followerID || null;
    follow.followedID = data.followedID || null;
    follow.isFollowed = data.isFollowed || false;


    if (data.Followed) {

        follow.user = {
            id: data.Followed.id,
            username: data.Followed.username,
            name: data.Followed.name,
            lastname: data.Followed.lastname,
            fullname: `${data.Followed.name} ${data.Followed.lastname}`,
            shortFullname: `${data.Followed.name} ${data.Followed.lastname.split(" ").pop()}`,
            avatar: data.Followed.avatar,
            verify_level: data.Followed.verify_level,

        };


    }
    else if (data.Follower) {

        follow.user = {
            id: data.Follower.id,
            username: data.Follower.username,
            name: data.Follower.name,
            lastname: data.Follower.lastname,
            fullname: `${data.Follower.name} ${data.Follower.lastname}`,
            shortFullname: `${data.Follower.name} ${data.Follower.lastname.split(" ").pop()}`,
            avatar: data.Follower.avatar,
            verify_level: data.Follower.verify_level,

        };


    } else {

        follow.user = {
            id: data.id,
            username: data.username,
            name: data.name,
            lastname: data.lastname,
            fullname: `${data.name} ${data.lastname}`,
            shortFullname: `${data.name} ${data.lastname.split(" ").pop()}`,
            avatar: data.avatar,
            verify_level: data.verify_level,
        };
    }




    follow.addFollower = async function () {
        const result = await addFollower(access_token, this.user.id);
        if (result === -2) {
            console.log("Usuário Seguido");
            return true;

        } else {
            console.log("Usuário já era Seguido");
            return false;
        }
    };
    follow.removeFollower = async function () {
        const result = await removeFollower(access_token, this.user.id);
        if (result === -2) {
            console.log("Usuário deixado de Seguir");
            return true;

        } else {
            console.log("Usuário já não era Seguido");
            return false;
        }
    };
    return follow;

}

export default createFollow;