import React, { useEffect, useRef, useState } from "react";
import '../index.css'
import styles from '../styles/MainPage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
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
import { getTimeline } from "../services/post/getTimelineService";
import { getLikedPosts } from "../services/post/getLikedPostsService";
import { getSavedPosts } from "../services/post/getSavedPostsService";



export default function MainPage() {

    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [currentPage, setCurrentPage] = useState('home');
    const [pageContent, setPageContent] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState(null);
    const [savedPosts, setSavedPosts] = useState(null);
    const [timeline, setTimeline] = useState(null);
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

            if (sessionStorage.getItem("access_token")) {
                access_token.current = sessionStorage.getItem("access_token");
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
            let result = null;
            switch (currentPage) {
                case 'home':
                    result = await getTimeline(access_token.current);
                    if (result === -1) {
                        console.log("Usuário não Autenticado: Erro Desconhecido");
                    } else if (result === -2) {
                        console.log("Usuário não Autenticado: Erro 401");
                        logout(navigate);
                    } else {
                        setTimeline(result);

                    }
                    break;
                case 'profile':
                    result = await getPosts(access_token.current);
                    if (result === -1) {
                        console.log("Usuário não Autenticado: Erro Desconhecido");
                    } else if (result === -2) {
                        console.log("Usuário não Autenticado: Erro 401");
                        logout(navigate);
                    } else {
                        setPosts(result);

                    }
                    break;
                case 'likes':
                    result = await getLikedPosts(access_token.current);
                    if (result === -1) {
                        console.log("Usuário não Autenticado: Erro Desconhecido");
                    } else if (result === -2) {
                        console.log("Usuário não Autenticado: Erro 401");
                        logout(navigate);
                    } else {
                        setLikedPosts(result);

                    }
                    break;
                case 'saved':
                    result = await getSavedPosts(access_token.current);
                    if (result === -1) {
                        console.log("Usuário não Autenticado: Erro Desconhecido");
                    } else if (result === -2) {
                        console.log("Usuário não Autenticado: Erro 401");
                        logout(navigate);
                    } else {
                        setSavedPosts(result);

                    }
                    break;
                default:
                    break;

            }


            setForceReloadTrigger(forceReloadTrigger + 1);


        })();



    }, [forceUpdateTrigger])


    useEffect(() => {


        switch (currentPage) {
            case 'home':
                setPageContent(
                    <>
                        <PostField key={uuidv4()} changePage={changePage} access_token={access_token.current} navigate={navigate} />
                        {timeline ? timeline.length !== 0 ? timeline.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} />)) : <div className={styles.emptyList}>
                            <FaHome className={styles.emptyListIcon} />
                            <span>Sua timeline está vazia. Comece a seguir pessoas e interagir para ver atualizações e postagens aqui!</span>
                        </div> : <div className={styles.loadingCircle}></div>}

                    </>
                );
                break;
            case 'profile':

                setPageContent(
                    <>
                        <PostField key={uuidv4()} changePage={changePage} access_token={access_token.current} navigate={navigate} />
                        {posts ? posts.length !== 0 ? posts.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} />)) : <div className={styles.emptyList}>
                            <FaUser className={styles.emptyListIcon} />
                            <span>Seu perfil ainda não tem postagens. Comece a compartilhar conteúdo para que suas postagens apareçam aqui!</span>
                        </div> : <div className={styles.loadingCircle}></div>}
                    </>
                );
                break;
            case 'likes':
                setPageContent(
                    <>
                        {likedPosts ? likedPosts.length !== 0 ? likedPosts.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} />)) : <div className={styles.emptyList}>
                            <FaHeart className={styles.emptyListIcon} />
                            <span>Você ainda não curtiu nenhuma postagem. Quando você começar a curtir, elas aparecerão aqui!</span>
                        </div> : <div className={styles.loadingCircle}></div>}
                    </>
                );
                break;
            case 'saved':
                setPageContent(
                    <>

                        {savedPosts ? savedPosts.length !== 0 ? savedPosts.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} />)) : <div className={styles.emptyList}>
                            <FaBookmark className={styles.emptyListIcon} />
                            <span>Você ainda não salvou nenhuma postagem. Quando você salvar algo, suas postagens favoritas aparecerão aqui!</span>
                        </div> : <div className={styles.loadingCircle}></div>}

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