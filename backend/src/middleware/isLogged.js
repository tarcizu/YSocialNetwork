const jwt = require("jsonwebtoken");

async function isLogged(request, response, next) {

    const access_token = request.body.access_token;
    const session_token = request.cookies.session_token;
    console.log("\n---------------MIDDLE STARTED----------------");
    console.log(`Middle IsLogged Acessado:\nAccess Token: ${access_token ? access_token : "[NÃO ENVIADO]"}\nSession Token: ${session_token ? session_token : "[NÃO ENVIADO]"}\n`);


    if (access_token && session_token) {
        await jwt.verify(access_token, process.env.TOKENPASSWORD, (error, decoded) => {
            if (error) {
                console.log("Falha ao autenticar usuário: Access Token invalido");
                console.log("---------------MIDDLE BLOCKED----------------");
                return response.sendStatus(401);
            }

            request.body.id = decoded.id;
            jwt.verify(session_token, process.env.TOKENPASSWORD, (error, decoded) => {
                if (error) {
                    console.log("Falha ao autenticar usuário: Session Token invalido");
                    console.log("---------------MIDDLE BLOCKED----------------");
                    return response.sendStatus(401);
                }


                console.log(`Usuário autenticado com sucesso: ID ${request.body.id}`);
                console.log("----------------MIDDLE PASSED----------------");
                next();
            })


        })

    } else {
        console.log("Falha ao autenticar usuário: Error Desconhecido");
        console.log("---------------MIDDLE BLOCKED----------------");
        return response.sendStatus(401);
    }


};
module.exports = isLogged;