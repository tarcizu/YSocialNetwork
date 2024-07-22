import React, { useState } from "react";
import styles from '../styles/SignUpPage.module.css'
import { signup } from '../services/database'
import { Link, useNavigate } from "react-router-dom";




export default function SignUpPage() {

    const navigate = useNavigate();

    const [signUpName, setSignUpName] = useState("");
    const [signUpLastName, setSignUpLastName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpUser, setSignUpUser] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpPasswordVerify, setSignUpPasswordVerify] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        const containerErrorEmail = document.getElementById('errorLineEmail');
        const containerErrorUser = document.getElementById('errorLineUser');
        const containerErrorPassword = document.getElementById('errorLinePassword');


        setErrorMessage("");
        containerErrorEmail.style.display = 'none';
        containerErrorUser.style.display = 'none';
        containerErrorPassword.style.display = 'none';



        if (signUpPassword !== signUpPasswordVerify) {

            setErrorMessage("A senhas não conferem");
            containerErrorPassword.style.display = 'flex';
            return
        }



        const result = await signup(signUpName, signUpLastName, signUpEmail, signUpUser, signUpPassword);
        if (result === -1) {
            setErrorMessage("Falha ao realizar cadastro");
            containerErrorPassword.style.display = 'flex';


        } else if (result === -2) {
            setErrorMessage("Já existe esse usuário");
            containerErrorUser.style.display = 'flex';

        } else if (result === -3) {
            setErrorMessage("Já existe esse e-mail");
            containerErrorEmail.style.display = 'flex';
        }
        else {
            const { access_token } = result;
            navigate('/home', { state: { access_token } });
        }


    }


    return (
        <div className={styles.PageContainer}>
            <form onSubmit={handleSubmitSignUp} className={styles.cardSignUp}>
                <h1>Cadastre-se</h1>
                <div className={styles.formField}>
                    <label htmlFor="signUpName">Nome</label>
                    <input type="text" id="signUpName" onChange={(e) => setSignUpName(e.target.value)} value={signUpName || ""} placeholder="Digite seu Nome" required />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="signUpLastName">Sobrenome</label>
                    <input type="text" id="signUpLastName" onChange={(e) => setSignUpLastName(e.target.value)} value={signUpLastName || ""} placeholder="Digite seu Sobrenome" required />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="signUpEmail">E-mail</label>
                    <input type="email" id="signUpEmail" onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail || ""} placeholder="Digite seu E-mail" required />
                </div>
                <p className={styles.errorLine} id="errorLineEmail">{errorMessage}</p>
                <div className={styles.formField}>
                    <label htmlFor="signUpUser">Usuário</label>
                    <input type="text" id="signUpUser" onChange={(e) => setSignUpUser(e.target.value)} value={signUpUser || ""} placeholder="Digite seu Usuário" required />
                </div>
                <p className={styles.errorLine} id="errorLineUser">{errorMessage}</p>
                <div className={styles.formField}>
                    <label htmlFor="signUpPassword">Senha</label>
                    <input type="password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword || ""} placeholder="Digite sua Senha" required />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="signUpPasswordVerify">Confirmar Senha</label>
                    <input type="password" id="signUpPasswordVerify" onChange={(e) => setSignUpPasswordVerify(e.target.value)} value={signUpPasswordVerify || ""} placeholder="Confirme sua Senha" required />
                </div>
                <p className={styles.errorLine} id="errorLinePassword">{errorMessage}</p>
                <button type="submit">Cadastrar</button>
                <p>Já tem uma conta no Y? <Link to="/login">Entre agora mesmo</Link></p>
            </form>
        </div>

    )
}