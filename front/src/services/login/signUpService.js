export async function signup(name, lastName, email, user, password) {

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
            sessionStorage.setItem("access_token", data.access_token);
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

