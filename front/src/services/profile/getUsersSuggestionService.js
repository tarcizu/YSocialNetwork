export async function getUsersSuggestion(access_token) {



    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/user/suggestions`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            return await res.json()

        } else if (res.status === 404) {

            return -2;

        }
    } catch (error) {

        return -1;
    }

}
