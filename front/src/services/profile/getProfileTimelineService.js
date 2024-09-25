export async function getProfileTimeline(id, access_token) {

    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/user/timeline/${id}`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            return await res.json()
        }

    } catch (error) {
        return -1;
    }


}
