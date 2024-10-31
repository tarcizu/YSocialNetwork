export async function getTrending(access_token) {



    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/posts/trending`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            return await res.json()



        } else {
            return -2;
        }
    } catch (error) {
        return -1;
    }

}
