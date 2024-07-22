const { jwtDecode } = require("jwt-decode");



async function login(user, password, keepSignedIn) {
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

async function signup(name, lastName, email, user, password) {

    const body = {
        username: user,
        password: password,
        email: email,
        name: name,
        lastName: lastName
    }
    try {
        const res = await fetch(process.env.REACT_APP_APIURL + "/users", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        if (res.ok) {
            return data;

        }
        else if (res.status === 409) {
            if (data.Code === 100) {
                return -2;

            }
            else if (data.Code === 101) {
                return -3;

            } else {

                return -1
            }

        }



    } catch (error) {

        return -1;
    }

};


module.exports = {
    login,
    signup
}