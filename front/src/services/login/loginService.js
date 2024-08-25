const { jwtDecode } = require("jwt-decode");



export async function login(user, password, keepSignedIn) {
    async function insertAccessCookie(token) {

        const exp = jwtDecode(token).exp;

        const expiresIn = new Date(exp * 1000).toUTCString();
        document.cookie = `access_token=${token};expires=${expiresIn};path=/`;
    }


    const body = {
        username: user,
        password: password
    };
    try {
        const res = await fetch(process.env.REACT_APP_APIURL + "/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();


        if (res.ok) {


            if (keepSignedIn === true) {


                insertAccessCookie(data.access_token);

            }
            else {
                sessionStorage.setItem("access_token", data.access_token)
            }

            return data;

        }
        else if (res.status === 401) {

            return -2;

        }
        else {
            return -1;
        }

    } catch (error) {
        return -1;
    }

};


