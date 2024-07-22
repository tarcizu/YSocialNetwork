import React, { useEffect, useState } from "react";
import styles from '../styles/MainPage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import cookies from 'js-cookie';



export default function MainPage() {


    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        (async () => {
            let access_token = '';
            if (location.state) {

                console.log(`Token Salvo no Location: ${access_token}`);

                access_token = location.state.access_token;




                console.log(`Token no Location: ${access_token}`);

            } else {

                access_token = cookies.get('access_token');
                console.log(`Token no Cookie: ${access_token}`);

            }

            try {
                const res = await fetch(process.env.REACT_APP_APIURL + "/auth", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ access_token: access_token }),
                    headers: { "Content-Type": "application/json" }
                });


                if (res.ok) {
                    setData(await res.json());
                    console.log("Deu certo a rota auth");


                } else if (res.status === 401) {
                    console.log("Deu 401");
                    cookies.remove('access_token');

                    navigate("/login");

                }

            } catch (error) {
                console.log(error);
            }


        })();


    }, [])



    return (
        <div className={styles.PageContainer}>
            <div className={styles.leftSide}>

            </div>
            <div className={styles.middleSide}>
                {data ?
                    <>
                        <h1>Pagina de {data.name || "Nome"} {data.lastname || "Sobrenome"}</h1>
                        <h1>E-mail {data.email || "E-mail"}</h1>
                    </>
                    :
                    <h1>Carregando</h1>

                }


            </div>
            <div className={styles.rightSide}>

            </div>

        </div>

    )
}