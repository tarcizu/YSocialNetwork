import { addFollower } from "../services/user/addFollowerService";
import { removeFollower } from "../services/user/removeFollowerService";

function createUser(data, access_token) {





    return {
        id: data.id,
        username: data.username,
        name: data.name,
        lastname: data.lastname,
        fullname: `${data.name} ${data.lastname}`,
        email: data.email,
        bio: data.bio,
        avatar: data.avatar,
        following: data.followingCount,
        followers: data.followerCount,
        access_level: data.access_level,
        verify_level: data.verify_level,
        createdData: data.createdAt,
        isFollowed: data.isFollowed,
        addFollower: async function () {

            const result = await addFollower(access_token, this.id);
            if (result === -2) {
                console.log("Usuário Seguido");
                return true;

            } else {
                console.log("Usuário já era Seguido");
                return false;
            }
        },
        removeFollower: async function () {
            const result = await removeFollower(access_token, this.id);

            if (result === -2) {
                console.log("Usuário deixado de Seguir");
                return true;

            } else {
                console.log("Usuário já não era Seguido");
                return false;
            }



        }


    }
}
export default createUser;