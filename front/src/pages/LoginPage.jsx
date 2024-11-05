import React, { useEffect, useState } from "react";
import '../index.css'
import styles from '../styles/LoginPage.module.css'
import { login } from '../services/login/loginService'
import { Link, useNavigate } from "react-router-dom";
import { setInitialTheme } from "../controller/themeController";
import { ReactComponent as Logo } from "../assets/images/Logo.svg"




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
            navigate('/home', { replace: true });

        }



    }



    useEffect(() => {

        setInitialTheme(document.getElementsByClassName('theme')[0]);

    }, [])

    return (
        <div className='theme'>
            <div className={styles.PageContainer}>

                <div className={styles.leftSide}>
                    <Logo className={styles.logo} />
                    <span className={styles.title}>Social Network</span>
                </div>


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
                    <p>Ainda não tem uma conta no Y? <Link className={styles.link} to="/signup">Cadastre-se</Link></p>
                </form>



            </div>
        </div>

    )
}