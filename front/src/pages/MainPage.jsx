import React, { useEffect, useRef, useState } from "react";
import '../index.css';
import styles from '../styles/MainPage.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import cookies from 'js-cookie';
import { FaSignOutAlt, FaUser, FaLightbulb, FaRegLightbulb, FaHome, FaHeart, FaBookmark, FaCog } from 'react-icons/fa';
import { MdFollowTheSigns } from 'react-icons/md'
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
import AvatarPhoto from "../components/AvatarPhoto";
import ProfileHeader from "../components/ProfileHeader";
import VerifyBadge from "../components/VerifyBadge";
import { getProfile } from "../services/profile/getProfileService";
import { getProfileTimeline } from "../services/profile/getProfileTimelineService";
import SectionHeader from "../components/SectionHeader";
import { getFollowers } from "../services/profile/getFollowersService";
import FollowLine from "../components/FollowLine";
import createFollow from "../models/Follower";
import { getFollowing } from "../services/profile/getFollowingService";
import { getPost } from "../services/post/getPostService";



export default function MainPage() {

    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [currentPage, setCurrentPage] = useState('');
    const [pageContent, setPageContent] = useState(null);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState(null);
    const [savedPosts, setSavedPosts] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [forceUpdateTrigger, setForceUpdateTrigger] = useState(0);
    const [forceReloadTrigger, setForceReloadTrigger] = useState(0);
    const [externalProfile, setExternalProfile] = useState(null);
    const [externalPosts, setExternalPosts] = useState(null);
    const [externalPost, setExternalPost] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);

    const targetUserID = useRef(null);
    const targetUserUsername = useRef(null);
    const pageMounted = useRef(false);
    const location = useLocation();
    let { receivedUsername, receivedPostID, receivedPostUsername } = location.state || {};


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

    const handleChangeTheme = async (e) => {
        e.preventDefault();
        setTheme(await changeTheme(document.getElementsByClassName('theme')[0]));
    }
    const handleFollowers = async (e) => {
        e.preventDefault();
        targetUserID.current = user.id;
        targetUserUsername.current = user.username;
        changePage('followers');
    }
    const handleFollowing = async (e) => {
        e.preventDefault();
        targetUserID.current = user.id;
        targetUserUsername.current = user.username;
        changePage('following');
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
                setUser(createUser(result, access_token.current));
                console.log("Usuário Autenticado");
            }
            pageMounted.current = true;

            if (receivedUsername) {

                changePage('profile');
            }
            else if (receivedPostID) {



                changePage('post');
            }
            else {
                changePage('home');

            }



        })();

        setInitialTheme(document.getElementsByClassName('theme')[0]);




    }, [])



    useEffect(() => {

        if (pageMounted.current) {

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
                    case 'myProfile':
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
                    case 'profile':
                        result = await getProfile(receivedUsername, access_token.current);
                        if (result === -1) {
                            console.log("Falha ao exibir usuário: Erro Desconhecido");
                        } else if (result === -2) {
                            console.log("Usuário não encontrado: Erro 404");
                            navigate("/404", { replace: true });
                        } else {
                            setExternalProfile(createUser(result, access_token.current));
                            const exPosts = await getProfileTimeline(result.id, access_token.current);
                            if (exPosts === -1) {
                                console.log("Falha ao obter postagens do usuário: Erro Desconhecido");
                            }
                            else {
                                setExternalPosts(exPosts);

                            }
                        }
                        break;
                    case 'post':
                        result = await getPost(receivedPostID, receivedPostUsername, access_token.current);
                        if (result === -1) {
                            navigate("/404", { replace: true });
                            console.log("Falha ao obter postagem: Erro Desconhecido");

                        } else if (result === -2) {
                            console.log("Falha ao obter postagem: Postagem não encontrada");
                            navigate("/404", { replace: true });
                        } else {
                            setExternalPost(result);
                        }
                        break;
                    case 'followers':
                        result = await getFollowers(targetUserID.current, access_token.current);


                        targetUserID.current = null;
                        if (result === -1) {
                            console.log("Falha ao obter seguidores: Erro Desconhecido");
                        }
                        else {
                            setFollowers(result);
                            const profile = await getProfile(targetUserUsername.current, access_token.current);
                            targetUserUsername.current = null;
                            if (profile === -1) {
                                console.log("Falha ao exibir usuário: Erro Desconhecido");
                            }
                            else {
                                setExternalProfile(createUser(profile, access_token.current));

                            }
                        }
                        break;
                    case 'following':
                        result = await getFollowing(targetUserID.current, access_token.current);
                        targetUserID.current = null;
                        if (result === -1) {
                            console.log("Falha ao obter seguidos: Erro Desconhecido");
                        }
                        else {
                            setFollowing(result);
                            const profile = await getProfile(targetUserUsername.current, access_token.current);
                            targetUserUsername.current = null;
                            if (profile === -1) {
                                console.log("Falha ao exibir usuário: Erro Desconhecido");
                            }
                            else {
                                setExternalProfile(createUser(profile, access_token.current));

                            }
                        }
                        break;
                    default:
                        break;

                }


                setForceReloadTrigger(forceReloadTrigger + 1);


            })();

        }





    }, [forceUpdateTrigger])


    useEffect(() => {

        if (pageMounted.current) {
            switch (currentPage) {
                case 'home':
                    setPageContent(
                        <>
                            {window.history.replaceState(null, '', '/home')}
                            <PostField key={uuidv4()} changePage={changePage} access_token={access_token.current} navigate={navigate} />
                            {
                                timeline ? timeline.length !== 0 ? timeline.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} />)) : <div className={styles.emptyList}>
                                    <FaHome className={styles.emptyListIcon} />
                                    <span>Sua timeline está vazia. Comece a seguir pessoas e interagir para ver atualizações e postagens aqui!</span>
                                </div> : < div className={styles.loadingCircle} ></div >}

                        </>
                    );
                    break;
                case 'myProfile':

                    setPageContent(
                        <>
                            {window.history.replaceState(null, '', '/profile/' + user.username)}
                            <ProfileHeader key={uuidv4()} user={user} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} />
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
                            {window.history.replaceState(null, '', '/home')}
                            <SectionHeader key={uuidv4()} title={"Postagens Curtidas"} Icon={FaHeart} />
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
                            {window.history.replaceState(null, '', '/home')}
                            <SectionHeader key={uuidv4()} title={"Postagens Salvas"} Icon={FaBookmark} />
                            {savedPosts ? savedPosts.length !== 0 ? savedPosts.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} />)) : <div className={styles.emptyList}>
                                <FaBookmark className={styles.emptyListIcon} />
                                <span>Você ainda não salvou nenhuma postagem. Quando você salvar algo, suas postagens favoritas aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}

                        </>
                    );
                    break;
                case 'profile':

                    setPageContent(
                        <>

                            <ProfileHeader key={uuidv4()} user={externalProfile} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} />

                            {externalPosts ? externalPosts.length !== 0 ? externalPosts.map(post => (<Post key={uuidv4()} post={createPost(post, access_token.current)} />)) : <div className={styles.emptyList}>
                                <FaUser className={styles.emptyListIcon} />
                                <span>O perfil ainda não tem postagens. Quando ele compartilhar conteúdo, suas postagens apareçam aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    navigate("/home", { replace: true });
                    { window.history.replaceState(null, '', '/profile/' + externalProfile.username) }
                    break;
                case 'post':

                    setPageContent(
                        <>
                            {externalPost ? externalPost.map(post => (<Post key={uuidv4()} post={createPost(post, access_token.current)} />)) : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    navigate("/home", { replace: true });
                    { window.history.replaceState(null, '', '/post/' + externalPost[0].PostUser.username + "/" + externalPost[0].id) }
                    break;
                case 'following':

                    setPageContent(
                        <>
                            {window.history.replaceState(null, '', '/home')}
                            <ProfileHeader key={uuidv4()} user={externalProfile} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} />

                            {following ? following.length !== 0 ? following.map(follower => (<FollowLine key={uuidv4()} follower={createFollow(follower, access_token.current)} />)) : <div className={styles.emptyList}>
                                <MdFollowTheSigns className={styles.emptyListIcon} />
                                <span>O perfil ainda não segue ninguém. Quando ele seguir alguém, eles aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );

                    setFollowers(null);
                    break;
                case 'followers':

                    setPageContent(
                        <>
                            {window.history.replaceState(null, '', '/home')}
                            <ProfileHeader key={uuidv4()} user={externalProfile} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} />

                            {followers ? followers.length !== 0 ? followers.map(follower => (<FollowLine key={uuidv4()} follower={createFollow(follower, access_token.current)} />)) : <div className={styles.emptyList}>
                                <MdFollowTheSigns className={styles.emptyListIcon} />
                                <span>O perfil ainda não é seguido por ninguém. Quando ele tiver seguidores, eles aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );

                    setFollowers(null);
                    break;
                case 'configs':

                    setPageContent(
                        <>
                            {window.history.replaceState(null, '', '/home')}
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




    }, [forceReloadTrigger, theme, externalPosts])

    return (user ? <>

        <div className='theme'>

            <div className={styles.PageContainer}>
                <div className={styles.PageContent}>
                    <div className={styles.leftSide}>
                        <div className={styles.UserHeader}>
                            <div className={styles.TopHeader}>
                                <AvatarPhoto>{user.avatar}</AvatarPhoto>
                                <div className={styles.UserNames}>
                                    <div className={styles.nameBadge}>

                                        <span id={styles.fullname}>{user.shortFullname} </span>

                                        <span className={styles.verifyBadge}><VerifyBadge className={styles.verifyBadge} verifyLevel={user.verify_level} /></span>

                                    </div>
                                    <h2>{"@" + user.username}</h2>



                                </div>

                            </div>
                            <div className={styles.BottonHeader}>
                                <span onClick={handleFollowing}><b>{user.following}</b> Seguindo </span>
                                <span onClick={handleFollowers}><b>{user.followers}</b> Seguidores</span>
                            </div>
                        </div>
                        <div className={styles.menuLeftContainer}>
                            <div className={styles.menuLeft}>



                                <div className={styles.MenuOption} onClick={() => changePage('home')}>
                                    <FaHome className={styles.icon} />
                                    <span>Home</span>
                                </div>
                                <div className={styles.MenuOption} onClick={() => changePage('myProfile')}>
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
                                <div className={styles.MenuOption} onClick={() => changePage('configs')}>
                                    <FaCog className={styles.icon} />
                                    <span>Configurações</span>
                                </div>
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