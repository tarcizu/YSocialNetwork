import React, { useState } from "react";
import styles from '../styles/LoginPage.module.css'
import { login } from '../services/database'
import { Link, useNavigate } from "react-router-dom";




export default function LoginPage() {

    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginKeepSignedIn, setLoginKeepSignedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");



    const clearLogin = () => {
        setLoginUser("");
        setLoginPassword("");
        setLoginKeepSignedIn(false);
    }


    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const containerError = document.getElementById('errorLine');

        setErrorMessage("");
        containerError.style.display = 'none';


        const result = await login(loginUser, loginPassword, loginKeepSignedIn);
        if (result === -1) {
            setErrorMessage("Falha ao realizar login");
            containerError.style.display = 'flex';
            clearLogin();
        }
        else if (result === -2) {
            setErrorMessage("Usuário ou senha invalido");
            containerError.style.display = 'flex';
            clearLogin();
        }
        else {
            const { access_token } = result;
            navigate('/home', { state: { access_token } });

        }



    }



    return (
        <div className={styles.PageContainer}>
            <form onSubmit={handleSubmitLogin} className={styles.cardLogin}>
                <h1>Entrar</h1>
                <div className={styles.formField} id="fieldLoginUser">
                    <label htmlFor="loginUser">Usuário</label>
                    <input type="text" id="loginUser" onChange={(e) => setLoginUser(e.target.value)} value={loginUser || ""} placeholder="Digite seu Usuário" required />
                </div>
                <div className={styles.formField} id="fieldLoginPassword">
                    <label htmlFor="loginPassword">Senha</label>
                    <input type="password" id="loginPassword" onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword || ""} placeholder="Digite sua Senha" required />
                </div>
                <p className={styles.errorLine} id="errorLine">{errorMessage}</p>
                <div className={styles.keepSignedIn}>
                    <input type="checkbox" id="keepSignedIn" onChange={(e) => setLoginKeepSignedIn(e.target.checked)} checked={loginKeepSignedIn} />
                    <label htmlFor="keepSignedIn">Manter-me conectado</label>
                </div>
                <button type="submit">Entrar</button>
                <p>Ainda não tem uma conta no Y? <Link to="/signup">Cadastre-se</Link></p>
            </form>
        </div>

    )
}