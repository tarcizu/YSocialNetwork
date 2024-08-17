import React, { useEffect, useRef, useState } from "react";
import '../index.css'
import styles from '../styles/MainPage.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import { FaSignOutAlt, FaUser, FaLightbulb, FaRegLightbulb, FaHome, FaHeart, FaBookmark } from 'react-icons/fa'
import Post from "../components/Post";
import createUser from "../models/User";



export default function MainPage() {

    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [currentPage, setCurrentPage] = useState('home');
    const [pageContent, setPageContent] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();


    const access_token = useRef('');



    const handleLogOut = (e) => {
        e.preventDefault();
        console.log("Usuário Realizou Logout");

        cookies.remove('access_token');

        navigate("/login", { replace: true });

    }
    const handleChangeTheme = (e) => {
        e.preventDefault();
        const element = document.getElementsByClassName('theme')[0];

        if (localStorage.getItem("theme") === "light" || localStorage.getItem("theme") === null) {
            element.style.setProperty('--ThemeColor', 'black');
            element.style.setProperty('--ContentColor', 'white');
            localStorage.setItem("theme", "dark");
            console.log("Tema alterado: Dark");

        } else {
            element.style.setProperty('--ThemeColor', 'white');
            element.style.setProperty('--ContentColor', 'black');
            localStorage.setItem("theme", "light");
            console.log("Tema alterado: Light");
        }
        setTheme(localStorage.getItem("theme"));
    }


    useEffect(() => {
        (async () => {


            if (location.state) {
                access_token.current = location.state.access_token;
            } else {
                access_token.current = cookies.get('access_token');
            }
            try {
                const res = await fetch(process.env.REACT_APP_APIURL + "/auth", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ access_token: access_token.current }),
                    headers: { "Content-Type": "application/json" }
                });

                if (res.ok) {
                    setUser(createUser(await res.json()));
                    console.log("Usuário Autenticado");
                } else if (res.status === 401) {
                    console.log("Usuário não Autenticado: Erro 401");
                    cookies.remove('access_token');
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        })();
        const element = document.getElementsByClassName('theme')[0];
        if (localStorage.getItem("theme") === "light" || localStorage.getItem("theme") === null) {
            element.style.setProperty('--ThemeColor', 'white');
            element.style.setProperty('--ContentColor', 'black');

        } else {
            element.style.setProperty('--ThemeColor', 'black');
            element.style.setProperty('--ContentColor', 'white');
        }
    }, [])



    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(process.env.REACT_APP_APIURL + "/posts", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ access_token: access_token.current }),
                    headers: { "Content-Type": "application/json" }
                });

                if (res.ok) {
                    setPosts(await res.json());



                } else if (res.status === 401) {
                    console.log("Usuário não Autenticado: Erro 401");
                    cookies.remove('access_token');
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        })();

    }, [currentPage === 'profile'])


    useEffect(() => {

        switch (currentPage) {
            case 'home':
                setPageContent(
                    <>
                        <h1>Timeline</h1>
                    </>
                );
                break;
            case 'profile':
                console.log(posts);

                setPageContent(
                    <>
                        {posts ? posts.map(post => (<Post username={post.user.username}>{post.content}</Post>)) : <div className={styles.loadingCircle}></div>}
                    </>
                );
                break;
            case 'likes':
                setPageContent(
                    <>
                        <h1>Itens Curtidos</h1>

                    </>
                );
                break;
            case 'saved':
                setPageContent(
                    <>
                        <h1>Itens Salvos</h1>

                    </>
                );
                break;
            default:
                break;
        }


    }, [currentPage])

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
                        <div className={styles.MenuLeft}>

                            <div className={styles.MenuOption} onClick={() => setCurrentPage('home')}>
                                <FaHome className={styles.icon} />
                                <span>Home</span>
                            </div>
                            <div className={styles.MenuOption} onClick={() => setCurrentPage('profile')}>
                                <FaUser className={styles.icon} />
                                <span>Perfil</span>
                            </div>
                            <div className={styles.MenuOption} onClick={() => setCurrentPage('likes')}>
                                <FaHeart className={styles.icon} />
                                <span>Curtidos</span>
                            </div>
                            <div className={styles.MenuOption} onClick={() => setCurrentPage('saved')}>
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
            <div className={styles.loadingCircle}></div>
        </div>
    </>



    )
}