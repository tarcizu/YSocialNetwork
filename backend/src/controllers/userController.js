const createUserService = require('../services/users/createUserService');
const findUserService = require('../services/users/findUserService');
const { createHash, validateHash } = require('./hashCrontroller');
const { createCookie, createToken } = require('./jwtController');


function buildUser(username, password, email, name, lastName) {
    return {
        username: username,
        password: password,
        email: email,
        name: name,
        lastname: lastName

    };

};


async function createUser(request, response) {

    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;
    const name = request.body.name;
    const lastName = request.body.lastName;
    const hashPassword = await createHash(password);

    console.log(`\nRota de cadastro de usuário acessada:\nUsuário: ${username ? username : "[NÃO ENVIADO]"}\nE-Mail: ${email ? email : "[NÃO ENVIADO]"}\nSenha: ${password ? "[SENSÍVEL]" : "[NÃO ENVIADO]"}\nNome: ${name ? name : "[NÃO ENVIADO]"}\nSobrenome: ${lastName ? lastName : "[NÃO ENVIADO]"}\n`);

    const user = buildUser(username, hashPassword, email, name, lastName);

    const result = await createUserService.createUser(user);

    if (result < 0) {
        if (result === -1) {
            console.log(`Falha ao cadastrar usuário: Error desconhecido`);
            response.sendStatus(400);
        }
        else if (result === -2) {
            console.log(`Falha ao cadastrar usuário: Usuário "${username}" já existe no Banco de Dados`);
            response.status(409).json({ "Code": 100, "Error": "User already exists" });
        }
        else if (result === -3) {
            console.log(`Falha ao cadastrar usuário: E-mail "${email}" já existe no Banco de Dados`);
            response.status(409).json({ "Code": 101, "Error": "E-mail already exists" });
        }
    }
    else {
        const { cookieName, cookieValue, cookieOptions } = createCookie(result.id, result.access_level);
        const token = createToken(result.id);

        console.log("Usuário cadastrado com sucesso com a id: " + result.id);
        const { password, updatedAt, ...userDate } = result;
        response.cookie(cookieName, cookieValue, cookieOptions);
        response.status(201).json({ ...userDate, access_token: token })
    }
}

async function login(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    console.log(`\nRota de login acessada:\nUsuário: ${username ? username : "[NÃO ENVIADO]"}\nSenha: ${password ? "[SENSÍVEL]" : "[NÃO ENVIADO]"}\n`);

    const result = await findUserService.findUserbyUsername(username);
    if (result < 0) {
        if (result === -2) {
            console.log(`Falha ao realizar login: Usuário invalido!`);
            response.status(401).json({ "Code": 102, "Error": "Invalid username or password" });
        }
        else if (result === -1) {
            console.log(`Falha ao realizar login: Error desconhecido`);
            response.sendStatus(400);
        }

    }
    else {
        const passwordStatus = await validateHash(password, result.password);
        if (passwordStatus) {
            const { cookieName, cookieValue, cookieOptions } = createCookie(result.id, result.access_level);
            const token = createToken(result.id);

            console.log(`Login realizado com sucesso no usuário "${result.username}"`);
            const { password, updatedAt, ...userDate } = result;

            response.cookie(cookieName, cookieValue, cookieOptions);
            response.status(200).json({ ...userDate, access_token: token });
        }
        else {
            console.log(`Falha ao realizar login: Senha invalida!`);
            response.status(401).json({ "Code": 102, "Error": "Invalid username or password" });
        }

    }

}


module.exports = {

    createUser,
    login
}