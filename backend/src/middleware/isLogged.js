const jwt = require("jsonwebtoken");

async function isLogged(request, response, next) {

    const access_token = request.body.access_token;
    const session_token = request.cookies.session_token;

    console.log(`\nMiddle IsLogged Acessado:\nAccess Token: ${access_token ? access_token : "[NÃO ENVIADO]"}\nSession Token: ${session_token ? session_token : "[NÃO ENVIADO]"}\n`);


    if (access_token && session_token) {
        await jwt.verify(access_token, process.env.TOKENPASSWORD, (error, decoded) => {
            if (error) {
                console.log("Error ao verificar o Access Token");
                response.sendStatus(401).end();
            }

            request.body.id = decoded.id;
            jwt.verify(session_token, process.env.TOKENPASSWORD, (error, decoded) => {
                if (error) {
                    console.log("Error ao verificar o Session Token");
                    response.sendStatus(401).end();
                }


                next();
            })


        })

    } else {
        console.log("Respondeu o 401");

        response.sendStatus(401).end();
    }


};
module.exports = isLogged;