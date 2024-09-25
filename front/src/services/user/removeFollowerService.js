export async function removeFollower(access_token, followedID) {

    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/user/unfollow/${followedID}`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {

            return -2;


        } else if (res.status === 409) {
            return -3;

        }
    } catch (error) {
        return -1;
    }

}
