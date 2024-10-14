export async function updateProfile(access_token, user) {

    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/users/update/profile`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token, user: user }),
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
export async function updatePassword(access_token, password) {

    try {
        const res = await fetch(process.env.REACT_APP_APIURL + `/users/update/password`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({ access_token: access_token, password: password }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {

            return -2;


        } else if (res.status === 401) {
            return -3;

        }
    } catch (error) {
        return -1;
    }

}
