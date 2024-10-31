import React, { useEffect, useRef, useState } from "react";
import '../index.css'
import styles from '../styles/ProfilePage.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import cookies from 'js-cookie';
import { FaCog, FaUser, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'
import Post from "../components/Post";
import createUser from "../models/User";
import LoadingCircle from "../components/LoadingCircle";
import createPost from "../models/Post";
import { auth } from "../services/auth/authService";
import { changeTheme, setInitialTheme } from "../controller/themeController";
import ProfileHeader from "../components/ProfileHeader";
import { getProfile } from "../services/profile/getProfileService";
import { getProfileTimeline } from "../services/profile/getProfileTimelineService";
import SectionHeader from "../components/SectionHeader";
import ScrollBackButton from "../components/ScrollBackButton";



export default function ProfilePage() {
    const { username } = useParams();
    const [currentPage, setCurrentPage] = useState('');
    const [profileUser, setProfileUser] = useState("");
    const [pageContent, setPageContent] = useState(null);
    const [profileTimelineUser, setProfileTimeLineUser] = useState("");
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


                    navigate("/home", { replace: true, state: { receivedUsername: username } });
                }
            } else {

                const profile = await getProfile(username);
                if (profile === -2) {
                    navigate("/404", { replace: true });

                } else {
                    setProfileUser(createUser(profile));

                }
                const posts = await getProfileTimeline(profile.id);

                if (posts === -1) {
                    console.log("Usuário não Autenticado: Erro Desconhecido");
                    navigate("/404", { replace: true });

                } else {
                    setProfileTimeLineUser(posts);

                }
                pageMounted.current = true;
                changePage('profile');

            }







        })();

        setInitialTheme(document.getElementsByClassName('theme')[0]);


    }, [])





    useEffect(() => {


        if (pageMounted.current) {

            switch (currentPage) {
                case 'profile':
                    setPageContent(
                        <>
                            <ProfileHeader user={profileUser} editable={false} />
                            {profileTimelineUser ? profileTimelineUser.length !== 0 ? profileTimelineUser.map(post => (<Post key={uuidv4()} post={createPost(post)} editable={false} />)) : <div className={styles.emptyList}>
                                <FaUser className={styles.emptyListIcon} />
                                <span>Esse perfil ainda não tem postagens. Quando ele começar a compartilhar conteúdo suas postagens aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
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



    return (profileUser ? <>

        <div className='theme'>

            <div className={styles.PageContainer}>
                <div className={styles.PageContent}>
                    <div className={styles.leftSide}>
                        <div className={styles.UserHeader}>

                            <button onClick={() => navigate("/login", { replace: true })}>Login</button>
                            <button onClick={() => navigate("/signup", { replace: true })}>Cadastrar-se</button>
                        </div>
                        <div className={styles.menuLeftContainer}>
                            <div className={styles.menuLeft}>

                                <div className={styles.MenuOption} onClick={() => changePage('profile')}>
                                    <FaUser className={styles.icon} />
                                    <span>Perfil</span>
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