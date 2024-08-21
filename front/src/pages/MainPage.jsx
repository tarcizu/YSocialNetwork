import React, { useEffect, useRef, useState } from "react";
import '../index.css'
import styles from '../styles/MainPage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import { FaSignOutAlt, FaUser, FaLightbulb, FaRegLightbulb, FaHome, FaHeart, FaBookmark } from 'react-icons/fa'
import Post from "../components/Post";
import createUser from "../models/User";
import LoadingCircle from "../components/LoadingCircle";
import createPost from "../models/Post";
import PostField from "../components/PostField";
import { auth } from "../services/auth/authService";
import { getPosts } from "../services/post/getPostsService";
import { logout } from "../controlller/logoutController";
import { changeTheme, setInitialTheme } from "../controlller/themeController";



export default function MainPage() {

    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [currentPage, setCurrentPage] = useState('home');
    const [pageContent, setPageContent] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [forceUpdateTrigger, setForceUpdateTrigger] = useState(0);
    const [forceReloadTrigger, setForceReloadTrigger] = useState(0);

    const forceUpdate = () => {
        setForceUpdateTrigger(forceUpdateTrigger + 1);
    }
    const changePage = async (page) => {

        if (page) {
            setCurrentPage(page);
        }
        forceUpdate();
    };

    const navigate = useNavigate();
    const location = useLocation();


    const access_token = useRef('');



    const handleLogOut = (e) => {
        e.preventDefault();
        console.log("Usuário Realizou Logout");
        logout(navigate);
    };

    const handleChangeTheme = (e) => {
        e.preventDefault();
        changeTheme(document.getElementsByClassName('theme')[0]);

    }


    useEffect(() => {




        (async () => {

            if (location.state) {
                access_token.current = location.state.access_token;
            } else {
                access_token.current = cookies.get('access_token');
            }
            const result = await auth(access_token.current);
            if (result === -1) {
                console.log("Usuário não Autenticado: Erro Desconhecido");
            } else if (result === -2) {
                console.log("Usuário não Autenticado: Erro 401");
                logout(navigate);
            } else {
                setUser(createUser(result));
                console.log("Usuário Autenticado");
            }
        })();

        setInitialTheme(document.getElementsByClassName('theme')[0]);




    }, [])



    useEffect(() => {


        (async () => {


            if (currentPage === 'profile') {

                setPosts(null);
                const result = await getPosts(access_token.current);
                if (result === -1) {
                    console.log("Usuário não Autenticado: Erro Desconhecido");
                } else if (result === -2) {
                    console.log("Usuário não Autenticado: Erro 401");
                    logout(navigate);
                } else {
                    setPosts(result);

                }
            }


            setForceReloadTrigger(forceReloadTrigger + 1);


        })();



    }, [forceUpdateTrigger])


    useEffect(() => {


        switch (currentPage) {
            case 'home':
                setPageContent(
                    <>
                        <PostField key={1} changePage={changePage} access_token={access_token.current} navigate={navigate} />
                        <div className={styles.emptyList}>
                            <FaHome className={styles.emptyListIcon} />
                            <span>Sua timeline está vazia. Comece a seguir pessoas e interagir para ver atualizações e postagens aqui!</span>
                        </div>
                    </>
                );
                break;
            case 'profile':

                setPageContent(
                    <>
                        <PostField key={2} changePage={changePage} access_token={access_token.current} navigate={navigate} />
                        {posts ? posts.length !== 0 ? posts.map(post => (<Post post={createPost(post, access_token)} />)) : <div className={styles.emptyList}>
                            <FaUser className={styles.emptyListIcon} />
                            <span>Seu perfil ainda não tem postagens. Comece a compartilhar conteúdo para que suas postagens apareçam aqui!</span>
                        </div> : <div className={styles.loadingCircle}></div>}
                    </>
                );
                break;
            case 'likes':
                setPageContent(
                    <>
                        <div className={styles.emptyList}>
                            <FaHeart className={styles.emptyListIcon} />
                            <span>Você ainda não curtiu nenhuma postagem. Quando você começar a curtir, elas aparecerão aqui!</span>
                        </div>

                    </>
                );
                break;
            case 'saved':
                setPageContent(
                    <>
                        <div className={styles.emptyList}>
                            <FaBookmark className={styles.emptyListIcon} />
                            <span>Você ainda não salvou nenhuma postagem. Quando você salvar algo, suas postagens favoritas aparecerão aqui!</span>
                        </div>

                    </>
                );
                break;
            default:
                break;
        }


    }, [forceReloadTrigger])

    return (user ? <>

        <div className='theme'>

            <div className={styles.PageContainer}>
                <div className={styles.PageContent}>
                    <div className={styles.leftSide}>
                        <div className={styles.UserHeader}>
                            <div className={styles.TopHeader}>
                                <img src={user.avatar} alt="Avatar" />
                                <div className={styles.UserNames}>

                                    <h1>{user.fullname}</h1>
                                    <h2>{"@" + user.username}</h2>


                                </div>
                            </div>
                            <div className={styles.BottonHeader}>
                                <span><b>{user.following}</b> Seguindo <b>{user.followers}</b> Seguidores</span>
                            </div>
                        </div>
                        <div className={styles.menuLeftContainer}>
                            <div className={styles.menuLeft}>



                                <div className={styles.MenuOption} onClick={() => changePage('home')}>
                                    <FaHome className={styles.icon} />
                                    <span>Home</span>
                                </div>
                                <div className={styles.MenuOption} onClick={() => changePage('profile')}>
                                    <FaUser className={styles.icon} />
                                    <span>Perfil</span>
                                </div>
                                <div className={styles.MenuOption} onClick={() => changePage('likes')}>
                                    <FaHeart className={styles.icon} />
                                    <span>Curtidos</span>
                                </div>
                                <div className={styles.MenuOption} onClick={() => changePage('saved')}>
                                    <FaBookmark className={styles.icon} />
                                    <span>Salvos</span>
                                </div>
                                {theme === "light" || theme === null ? <>
                                    <div className={styles.MenuOption} onClick={handleChangeTheme}>
                                        <FaLightbulb className={styles.icon} />
                                        <span>Modo Escuro</span>
                                    </div>
                                </> : <>
                                    <div className={styles.MenuOption} onClick={handleChangeTheme}>
                                        <FaRegLightbulb className={styles.icon} />
                                        <span>Modo Claro</span>
                                    </div>
                                </>}
                                <div className={styles.MenuOption} onClick={handleLogOut}>
                                    <FaSignOutAlt className={styles.icon} />
                                    <span>Logout</span>
                                </div>



                            </div>
                        </div>
                    </div>
                    <div className={styles.middleSide}>
                        {pageContent}


                    </div>
                    <div className={styles.rightSide}>

                    </div>

                </div>
            </div>
        </div>
    </> : <>
        <div className='theme'>
            <LoadingCircle />
        </div >
    </>



    )
}