const jwt = require("jsonwebtoken");

async function hasUser(request, response, next) {

    const access_token = request.body.access_token;
    const session_token = request.cookies.session_token;
    console.log("\n---------------MIDDLE STARTED----------------");
    console.log(`Middle hasUser Acessado:\nAccess Token: ${access_token ? access_token : "[NÃO ENVIADO]"}\nSession Token: ${session_token ? session_token : "[NÃO ENVIADO]"}\n`);


    if (access_token && session_token) {
        await jwt.verify(access_token, process.env.TOKENPASSWORD, (error, decoded) => {
            if (error) {
                console.log("Falha ao autenticar usuário: Access Token invalido");
                console.log("----------------MIDDLE PASSED----------------");
                return next();
            }

            jwt.verify(session_token, process.env.TOKENPASSWORD, (error, decoded) => {
                if (error) {
                    console.log("Falha ao autenticar usuário: Session Token invalido");
                    console.log("----------------MIDDLE PASSED----------------");
                    return next();
                }
                request.body.otherUserID = decoded.id;


                console.log(`Usuário autenticado com sucesso: ID ${request.body.otherUserID}`);
                console.log("----------------MIDDLE PASSED----------------");
                return next();
            })


        })

    } else {
        console.log("Falha ao autenticar usuário: Error Desconhecido");
        console.log("----------------MIDDLE PASSED----------------");
        return next();

    }


};
module.exports = hasUser;