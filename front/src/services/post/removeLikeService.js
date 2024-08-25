export async function removeLike(access_token, postID) {

    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/posts/${postID}/like/`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {

            return -2;


        } else if (res.status === 404) {
            return -3;

        }
    } catch (error) {
        return -1;
    }

}
