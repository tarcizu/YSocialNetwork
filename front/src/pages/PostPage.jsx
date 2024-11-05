import React, { useEffect, useRef, useState } from "react";
import '../index.css'
import styles from '../styles/PostAndProfilePages.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import cookies from 'js-cookie';
import { FaCog, FaUser, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'
import Post from "../components/Post";
import LoadingCircle from "../components/LoadingCircle";
import createPost from "../models/Post";
import { auth } from "../services/auth/authService";
import { changeTheme, setInitialTheme } from "../controller/themeController";
import SectionHeader from "../components/SectionHeader";
import { getPost } from "../services/post/getPostService";
import ScrollBackButton from "../components/ScrollBackButton";
import { ReactComponent as Logo } from "../assets/images/Logo.svg"



export default function PostPage() {
    const { id, username } = useParams();
    const [currentPage, setCurrentPage] = useState('');
    const [pageContent, setPageContent] = useState(null);
    const [userPost, setUserPost] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [forceReloadTrigger, setForceReloadTrigger] = useState(0);


    const pageMounted = useRef(false);

    const changePage = async (page) => {
        if (page) {
            setCurrentPage(page);
        }
        setForceReloadTrigger(forceReloadTrigger + 1);
    };

    const navigate = useNavigate();


    const access_token = useRef('');

    const handleChangeTheme = async (e) => {
        e.preventDefault();
        setTheme(await changeTheme(document.getElementsByClassName('theme')[0]));

    }


    useEffect(() => {


        (async () => {




            if (sessionStorage.getItem("access_token")) {
                access_token.current = sessionStorage.getItem("access_token");

            } else if (cookies.get('access_token')) {
                access_token.current = cookies.get('access_token');
            }
            if (access_token.current) {
                const result = await auth(access_token.current);
                if (result !== -1 && result !== -2) {


                    navigate("/home", { replace: true, state: { receivedPostUsername: username, receivedPostID: id } });
                }
            } else {

                const post = await getPost(id, username);


                if (post === -1) {
                    navigate("/404", { replace: true });
                    console.log("Falha ao obter postagem: Erro Desconhecido");

                } else if (post === -2) {
                    console.log("Falha ao obter postagem: Postagem não encontrada");
                    navigate("/404", { replace: true });
                } else {
                    setUserPost(post);

                }
                pageMounted.current = true;
                changePage('post');

            }







        })();

        setInitialTheme(document.getElementsByClassName('theme')[0]);


    }, [])





    useEffect(() => {


        if (pageMounted.current) {

            switch (currentPage) {
                case 'post':
                    setPageContent(
                        <>
                            {userPost ? userPost.map(post => (<Post key={uuidv4()} post={createPost(post)} editable={false} />)) : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    break;
                case 'configs':

                    setPageContent(
                        <>
                            <SectionHeader key={uuidv4()} title={"Configurações"} Icon={FaCog} />
                            <div className={styles.menuConfigs}>
                                {theme === "light" || theme === null ? <>
                                    <div className={styles.configOption} onClick={handleChangeTheme}>
                                        <FaLightbulb className={styles.icon} />
                                        <span>Ativar Modo Escuro</span>
                                    </div>
                                </> : <>
                                    <div className={styles.configOption} onClick={handleChangeTheme}>
                                        <FaRegLightbulb className={styles.icon} />
                                        <span>Ativar Modo Claro</span>
                                    </div>
                                </>}
                            </div>

                        </>
                    );
                    break;
                default:
                    break;
            }


        }




    }, [forceReloadTrigger, theme])



    return (userPost ? <>

        <div className='theme'>

            <div className={styles.PageContainer}>
                <div className={styles.PageContent}>
                    <div className={styles.leftSide}>
                        <div className={styles.UserHeader}>
                            <div className={styles.brandContainer}>
                                <Logo className={styles.logo} />
                                <span className={styles.title}>Social Network</span>
                            </div>
                            <button onClick={() => navigate("/login", { replace: true })}>Login</button>
                            <button onClick={() => navigate("/signup", { replace: true })}>Cadastrar-se</button>
                        </div>
                        <div className={styles.menuLeftContainer}>
                            <div className={styles.menuLeft}>

                                <div className={styles.MenuOption} onClick={() => changePage('post')}>
                                    <FaUser className={styles.icon} />
                                    <span>Postagem</span>
                                </div>

                                <div className={styles.MenuOption} onClick={() => changePage('configs')}>
                                    <FaCog className={styles.icon} />
                                    <span>Configurações</span>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className={styles.middleSide}>

                        {pageContent}


                    </div>
                    <div className={styles.rightSide}>

                    </div>
                    <ScrollBackButton />
                </div>
            </div>
        </div >
    </> : <>
        <div className='theme'>
            <LoadingCircle />
        </div >
    </>



    )
}