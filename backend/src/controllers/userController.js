const createUserService = require('../services/users/createUserService');
const findUserService = require('../services/users/findUserService');
const { createHash, validateHash } = require('./hashController');
const { createCookie, createToken } = require('./jwtController');
const { addFollower } = require('../services/users/addFollowerService');
const { removeFollower } = require('../services/users/removeFollowerService');


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
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de cadastro de usuário acessada:\nUsuário: ${username ? username : "[NÃO ENVIADO]"}\nE-Mail: ${email ? email : "[NÃO ENVIADO]"}\nSenha: ${password ? "[SENSÍVEL]" : "[NÃO ENVIADO]"}\nNome: ${name ? name : "[NÃO ENVIADO]"}\nSobrenome: ${lastName ? lastName : "[NÃO ENVIADO]"}\n`);

    const user = buildUser(username, hashPassword, email, name, lastName);

    const result = await createUserService.createUser(user);

    if (result < 0) {
        if (result === -1) {
            console.log(`Falha ao cadastrar usuário: Error desconhecido`);
            console.log("-----------------ROUTE ENDED-----------------");
            response.sendStatus(400);
        }
        else if (result === -2) {
            console.log(`Falha ao cadastrar usuário: Usuário "${username}" já existe no Banco de Dados`);
            console.log("-----------------ROUTE ENDED-----------------");
            response.status(409).json({ "Code": 100, "Error": "User already exists" });
        }
        else if (result === -3) {
            console.log(`Falha ao cadastrar usuário: E-mail "${email}" já existe no Banco de Dados`);
            console.log("-----------------ROUTE ENDED-----------------");
            response.status(409).json({ "Code": 101, "Error": "E-mail already exists" });
        }
    }
    else {
        const { cookieName, cookieValue, cookieOptions } = createCookie(result.id, result.access_level);
        const token = createToken(result.id);

        console.log("Usuário cadastrado com sucesso com a id: " + result.id);
        const { password, updatedAt, ...userDate } = result;
        response.cookie(cookieName, cookieValue, cookieOptions);
        console.log("-----------------ROUTE ENDED-----------------");
        response.status(201).json({ ...userDate, access_token: token })
    }
}

async function login(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de login acessada:\nUsuário: ${username ? username : "[NÃO ENVIADO]"}\nSenha: ${password ? "[SENSÍVEL]" : "[NÃO ENVIADO]"}\n`);

    const result = await findUserService.findUserbyUsername(username);
    if (result < 0) {
        if (result === -2) {
            console.log(`Falha ao realizar login: Usuário invalido!`);
            console.log("-----------------ROUTE ENDED-----------------");
            response.status(401).json({ "Code": 102, "Error": "Invalid username or password" });
        }
        else if (result === -1) {
            console.log(`Falha ao realizar login: Error desconhecido`);
            console.log("-----------------ROUTE ENDED-----------------");
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
            console.log("-----------------ROUTE ENDED-----------------");
            response.status(200).json({ ...userDate, access_token: token });
        }
        else {
            console.log(`Falha ao realizar login: Senha invalida!`);
            console.log("-----------------ROUTE ENDED-----------------");
            response.status(401).json({ "Code": 102, "Error": "Invalid username or password" });
        }

    }

}

async function addUserFollower(request, response) {
    const followedID = request.params.id;
    const followerID = request.body.id;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Seguir acessada:\nID do Seguidor: ${followerID ? followerID : "[NÃO ENVIADO]"}\nID a ser Seguido: ${followedID ? followedID : "[NÃO ENVIADO]"}\n`);

    const result = await addFollower(followedID, followerID);
    if (result === -1) {
        console.log(`\nFalha ao seguir usuário: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    } else if (result === -3) {
        console.log(`\nFalha ao seguir usuário: Usuário já era seguido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(409);
    } else if (result === -2) {
        console.log(`\nUsuário Seguido com sucesso!`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);

    }
}
async function removeUserFollower(request, response) {
    const followedID = request.params.id;
    const followerID = request.body.id;
    console.log("\n----------------ROUTE STARTED----------------");
    console.log(`Rota de Deixar de Seguir acessada:\nID do Seguidor: ${followerID ? followerID : "[NÃO ENVIADO]"}\nID a deixar de ser Seguido: ${followedID ? followedID : "[NÃO ENVIADO]"}\n`);

    const result = await removeFollower(followedID, followerID);
    if (result === -1) {

        console.log(`\nFalha ao deixar de seguir usuário: Error desconhecido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(400);
    } else if (result === -2) {
        console.log(`\nFalha ao deixar de seguir usuário: Usuário já não era seguido`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(404);
    } else {
        console.log(`\nUsuário deixado de seguir com sucesso!`);
        console.log("-----------------ROUTE ENDED-----------------");
        response.sendStatus(200);

    }
}

module.exports = {

    createUser,
    login,
    addUserFollower,
    removeUserFollower
}