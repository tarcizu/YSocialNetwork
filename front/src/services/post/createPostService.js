export async function createPost(access_token, content, image = null) {

    try {
        const res = await fetch(process.env.REACT_APP_APIURL + "/posts/create/", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token, content: content, image: image, source: 1 }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {

            return await res.json();


        } else if (res.status === 401) {
            return -2;

        }
    } catch (error) {
        return -1;
    }

}
