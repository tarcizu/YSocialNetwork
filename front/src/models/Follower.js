import { addFollower } from "../services/user/addFollowerService";
import { removeFollower } from "../services/user/removeFollowerService";

function createFollow(data, access_token) {
    const follow = {};



    follow.id = data.id;
    follow.followerID = data.followerID;
    follow.followedID = data.followedID;
    follow.isFollowed = data.isFollowed;


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