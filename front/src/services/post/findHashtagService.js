export async function findHashtag(hashtag, access_token) {



    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/search/hashtag`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token, hashtag: hashtag }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            return await res.json();
        }
        else if (res.status === 404) {
            return [];
        }
    } catch (error) {
        return -1;
    }

}
