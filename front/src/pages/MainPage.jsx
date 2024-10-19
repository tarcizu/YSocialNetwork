import React, { useEffect, useRef, useState } from "react";
import '../index.css';
import styles from '../styles/MainPage.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import cookies from 'js-cookie';
import { FaSignOutAlt, FaUser, FaLightbulb, FaRegLightbulb, FaHome, FaHeart, FaBookmark, FaCog, FaUserEdit, FaTrashAlt, FaSearch, FaHashtag } from 'react-icons/fa';
import { MdFollowTheSigns } from 'react-icons/md'
import { RiLockPasswordFill } from "react-icons/ri";
import Post from "../components/Post";
import createUser from "../models/User";
import LoadingCircle from "../components/LoadingCircle";
import createPost from "../models/Post";
import PostBox from "../components/PostBox";
import { auth } from "../services/auth/authService";
import { getPosts } from "../services/post/getPostsService";
import { logout } from "../controller/logoutController";
import { changeTheme, setInitialTheme } from "../controller/themeController";
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
import SearchBox from "../components/SearchBox";
import { getUsersSuggestion } from "../services/profile/getUsersSuggestionService";
import { updatePassword, updateProfile } from "../services/user/updateUserService";
import { UploadPhoto } from "../services/external/UploadPhotoService";



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
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchHashtag, setSearchHashtag] = useState(null);
    const [followingCount, setFollowingCount] = useState(0);
    const [usersSuggestion, setUsersSuggestion] = useState(null);



    const avatarInputRef = useRef(null);


    const [errorMessage, setErrorMessage] = useState('');




    const [editableProfile, setEditableProfile] = useState(null);
    const [editablePassword, setEditablePassword] = useState({ oldPassword: null, newPassword: null, newPasswordVerify: null });
    const [newPhoto, setNewPhoto] = useState(null);
    const [base64Photo, setBase64Photo] = useState(null);

    const access_token = useRef('');

    const targetUserID = useRef(null);
    const targetUserUsername = useRef(null);
    const pageMounted = useRef(false);
    const [profileUpdateMounted, setProfileUpdateMounted] = useState(false);
    const [startUpdateProfile, setStartUpdateProfile] = useState(false);
    const [startUploadPhoto, setStartUploadPhoto] = useState(false);
    const location = useLocation();

    let { receivedUsername, receivedPostID, receivedPostUsername } = location.state || {};

    const navigate = useNavigate();

    const forceUpdate = () => {
        setForceUpdateTrigger(forceUpdateTrigger + 1);
    }

    const changePage = async (page) => {
        if (page) {
            setCurrentPage(page);
        }
        forceUpdate();
    };

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

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setStartUpdateProfile(true);
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        const oldPasswordPlace = document.getElementById('oldPasswordLine');
        const newPasswordPlace = document.getElementById('newPasswordLine');
        oldPasswordPlace.style.display = 'none';
        newPasswordPlace.style.display = 'none';

        if (editablePassword.newPassword === editablePassword.newPasswordVerify) {

            const result = await updatePassword(access_token.current, editablePassword);
            if (result === -1) {
                console.log("Não foi possível alterar a senha");
            }
            else if (result === -3) {
                setErrorMessage('Senha invalida');
                oldPasswordPlace.style.display = 'flex';
            } else if (result === -2) {
                console.log("Senha alterada com sucesso");
                navigate(0);
            };
        } else {
            setErrorMessage('A senhas não conferem');
            newPasswordPlace.style.display = 'flex';
        }
    }

    const handleAvatarSend = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Photo(reader.result);
                setNewPhoto(URL.createObjectURL(file));
            }
            reader.readAsDataURL(file);
            setStartUploadPhoto(true);
        }
    }
    const handleAvatarClick = async (e) => {
        avatarInputRef.current.click();
    }
    const handleRemoveAvatar = async (e) => {
        e.preventDefault();
        if (newPhoto) {
            setNewPhoto(null);
        }
        if (editableProfile.avatar) {

            setEditableProfile((editableProfile) => ({ ...editableProfile, avatar: null }));
        }
        setStartUploadPhoto(false);




    }

    useEffect(() => {
        (async () => {
            if (startUpdateProfile) {

                const photoPlace = document.getElementById('photoLine');
                photoPlace.style.display = 'none';

                if (startUploadPhoto) {
                    const result = await UploadPhoto(base64Photo);
                    if (result === -1) {
                        setErrorMessage('Não foi possível atualizar a foto');
                        photoPlace.style.display = 'flex';
                        setStartUpdateProfile(false);
                        setNewPhoto(null);
                    } else {
                        setEditableProfile((editableProfile) => ({ ...editableProfile, avatar: result }));
                        setProfileUpdateMounted(true)
                    }
                    setStartUploadPhoto(false);

                } else {
                    setProfileUpdateMounted(true);
                }

                const emailPlace = document.getElementById('emailLine');
                emailPlace.style.display = 'none';

                if (profileUpdateMounted) {
                    const result = await updateProfile(access_token.current, editableProfile);
                    if (result === -1) {
                        console.log("Não foi possível atualizar o perfil");

                    }
                    else if (result === -3) {
                        setErrorMessage('Já existe um usuário com esse e-mail');
                        emailPlace.style.display = 'flex';

                    } else if (result === -2) {
                        console.log("Perfil Atualizado");
                        navigate(0);

                    };
                    setProfileUpdateMounted(false);
                    setStartUpdateProfile(false);
                }


            }

        })();





    }, [editableProfile, startUpdateProfile, profileUpdateMounted])






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
                setFollowingCount(parseInt(result.followingCount));

                console.log("Usuário Autenticado");
            }
            const suggestion = await getUsersSuggestion(access_token.current);
            if (suggestion === -1) {

            } else {

                setUsersSuggestion(suggestion);
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
                    case 'editProfile':
                        setEditableProfile(user);
                        setNewPhoto(null);
                        break;
                    case 'editPassword':
                        break;
                    case 'result':

                        break;
                    case 'hashtag':

                        break;
                    case 'editPassword':
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
            let pagePath = "";
            let pageContent = "";
            switch (currentPage) {
                case 'home':
                    pagePath = '/home'
                    pageContent = (
                        <>

                            <PostBox key={uuidv4()} changePage={changePage} access_token={access_token.current} navigate={navigate} />
                            {
                                timeline ? timeline.length !== 0 ? timeline.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} changePage={changePage} searchHashtag={setSearchHashtag} />)) : <div className={styles.emptyList}>
                                    <FaHome className={styles.emptyListIcon} />
                                    <span>Sua timeline está vazia. Comece a seguir pessoas e interagir para ver atualizações e postagens aqui!</span>
                                </div> : < div className={styles.loadingCircle} ></div >}

                        </>
                    );
                    break;
                case 'myProfile':
                    pagePath = '/profile/' + user.username;
                    pageContent = (
                        <>
                            <ProfileHeader key={uuidv4()} user={user} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} following={followingCount} setFollowing={setFollowingCount} />
                            {posts ? posts.length !== 0 ? posts.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} changePage={changePage} searchHashtag={setSearchHashtag} />)) : <div className={styles.emptyList}>
                                <FaUser className={styles.emptyListIcon} />
                                <span>Seu perfil ainda não tem postagens. Comece a compartilhar conteúdo para que suas postagens apareçam aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    break;
                case 'likes':
                    pagePath = '/home'
                    pageContent = (
                        <>
                            <SectionHeader key={uuidv4()} title={"Postagens Curtidas"} Icon={FaHeart} />
                            {likedPosts ? likedPosts.length !== 0 ? likedPosts.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} changePage={changePage} searchHashtag={setSearchHashtag} />)) : <div className={styles.emptyList}>
                                <FaHeart className={styles.emptyListIcon} />
                                <span>Você ainda não curtiu nenhuma postagem. Quando você começar a curtir, elas aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    break;
                case 'saved':
                    pagePath = '/home'
                    pageContent = (
                        <>
                            <SectionHeader key={uuidv4()} title={"Postagens Salvas"} Icon={FaBookmark} />
                            {savedPosts ? savedPosts.length !== 0 ? savedPosts.map(post => (<Post key={uuidv4()} user={user} post={createPost(post, access_token.current)} changePage={changePage} searchHashtag={setSearchHashtag} />)) : <div className={styles.emptyList}>
                                <FaBookmark className={styles.emptyListIcon} />
                                <span>Você ainda não salvou nenhuma postagem. Quando você salvar algo, suas postagens favoritas aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    break;
                case 'profile':
                    pagePath = '/profile/' + externalProfile.username;
                    pageContent = (
                        <>

                            <ProfileHeader key={uuidv4()} user={externalProfile} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} following={followingCount} setFollowing={setFollowingCount} />

                            {externalPosts ? externalPosts.length !== 0 ? externalPosts.map(post => (<Post key={uuidv4()} post={createPost(post, access_token.current)} user={user} changePage={changePage} searchHashtag={setSearchHashtag} />)) : <div className={styles.emptyList}>
                                <FaUser className={styles.emptyListIcon} />
                                <span>O perfil ainda não tem postagens. Quando ele compartilhar conteúdo, suas postagens apareçam aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    navigate("/home", { replace: true });
                    break;
                case 'post':
                    pagePath = '/post/' + externalPost[0].PostUser.username + "/" + externalPost[0].id;
                    pageContent = (
                        <>
                            {externalPost ? externalPost.map(post => (<Post key={uuidv4()} post={createPost(post, access_token.current)} user={user} changePage={changePage} searchHashtag={setSearchHashtag} />)) : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    navigate("/home", { replace: true });
                    break;
                case 'following':
                    pagePath = '/home'
                    pageContent = (
                        <>

                            <ProfileHeader key={uuidv4()} user={externalProfile} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} following={followingCount} setFollowing={setFollowingCount} />

                            {following ? following.length !== 0 ? <><SectionHeader key={uuidv4()} title={"Lista de Seguidos"} Icon={MdFollowTheSigns} small={true} />{following.map(follower => (<FollowLine key={uuidv4()} follower={createFollow(follower, access_token.current)} activeUserID={user.id} following={followingCount} setFollowing={setFollowingCount} />))}</> : <div className={styles.emptyList}>
                                <MdFollowTheSigns className={styles.emptyListIcon} />
                                <span>O perfil ainda não segue ninguém. Quando ele seguir alguém, eles aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );

                    setFollowers(null);
                    break;
                case 'followers':
                    pagePath = '/home'
                    pageContent = (
                        <>

                            <ProfileHeader key={uuidv4()} user={externalProfile} changePage={changePage} targetUsername={targetUserUsername} targetID={targetUserID} activeUserID={user.id} following={followingCount} setFollowing={setFollowingCount} />

                            {followers ? followers.length !== 0 ? <> <SectionHeader key={uuidv4()} title={"Lista de Seguidores"} Icon={MdFollowTheSigns} small={true} />{followers.map(follower => (<FollowLine key={uuidv4()} follower={createFollow(follower, access_token.current)} activeUserID={user.id} following={followingCount} setFollowing={setFollowingCount} />))}</> : <div className={styles.emptyList}>
                                <MdFollowTheSigns className={styles.emptyListIcon} />
                                <span>O perfil ainda não é seguido por ninguém. Quando ele tiver seguidores, eles aparecerão aqui!</span>
                            </div> : <div className={styles.loadingCircle}></div>}
                        </>
                    );
                    break;
                case 'result':
                    pagePath = '/home'
                    pageContent = (
                        <>

                            <SectionHeader key={uuidv4()} title={"Resultado"} Icon={FaSearch} />
                            <h1>Pesquisando por {searchTerm}</h1>

                        </>
                    );
                    break;
                case 'hashtag':
                    pagePath = '/home'
                    pageContent = (
                        <>

                            <SectionHeader key={uuidv4()} title={"Hashtag"} Icon={FaHashtag} />
                            <h1>Pesquisando por {searchHashtag}</h1>

                        </>
                    );
                    break;
                case 'editProfile':
                    pagePath = '/home';
                    pageContent = (
                        <>
                            <SectionHeader key={uuidv4()} title={"Editar Perfil"} Icon={FaUserEdit} />

                            <form onSubmit={handleUpdateProfile} className={styles.updateContainer}>




                                <div className={styles.updatePhotoContainer}>
                                    <label htmlFor="editPhoto">Foto</label>
                                    <div className={styles.photoContainer} id="editPhoto" onClick={handleAvatarClick}>{newPhoto ? <AvatarPhoto key={user.id + '1' + newPhoto} onClick={handleAvatarClick} profileName={editableProfile.fullname}>{newPhoto}</AvatarPhoto> : <AvatarPhoto key={user.id + '2' + editableProfile.avatar} profileName={editableProfile.fullname}>{editableProfile.avatar}</AvatarPhoto>}</div>
                                    {editableProfile.avatar || newPhoto ? <button className={styles.removeAvatarButton} onClick={handleRemoveAvatar}><FaTrashAlt className={styles.trashIcon} /></button> : <></>}
                                    <span className={styles.errorMessage} id="photoLine">{errorMessage}</span>

                                    <input ref={avatarInputRef} type="file" name="" id="" accept="image/*" onChange={handleAvatarSend} />
                                </div>

                                <div className={styles.formField}>
                                    <label htmlFor="editName">Nome</label>
                                    <input type="text" id="editName" onChange={(e) => setEditableProfile((editableProfile) => ({ ...editableProfile, name: e.target.value }))} defaultValue={editableProfile.name || ""} placeholder="Digite seu Nome" maxLength="50" required />

                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="editLastname">Sobrenome</label>
                                    <input type="text" id="editLastname" onChange={(e) => setEditableProfile((editableProfile) => ({ ...editableProfile, lastname: e.target.value }))} defaultValue={editableProfile.lastname || ""} placeholder="Digite seu Sobrenome" maxLength="100" required />
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="editEmail">E-mail</label>
                                    <input type="email" id="editEmail" onChange={(e) => setEditableProfile((editableProfile) => ({ ...editableProfile, email: e.target.value }))} defaultValue={editableProfile.email || ""} placeholder="Digite seu E-mail" maxLength="255" required />
                                </div>
                                <span className={styles.errorMessage} id="emailLine">{errorMessage}</span>
                                <div className={styles.formField}>
                                    <label htmlFor="editBio">Biografia</label>
                                    <textarea id="editBio" maxLength="255" autoComplete="off" rows="4" onChange={(e) => setEditableProfile((editableProfile) => ({ ...editableProfile, bio: e.target.value }))} defaultValue={editableProfile.bio || ""} ></textarea>
                                </div>
                                <button className={styles.editButton} type="submit">Editar</button>
                            </form >




                        </>
                    );
                    break;
                case 'editPassword':

                    pagePath = '/home'
                    pageContent = (
                        <>
                            <SectionHeader key={uuidv4()} title={"Alterar Senha"} Icon={RiLockPasswordFill} />

                            <form onSubmit={handleUpdatePassword} className={styles.updateContainer}>

                                <div className={styles.formField}>
                                    <label htmlFor="editOldPassword">Senha Atual</label>
                                    <input type="password" id="editOldPassword" onChange={(e) => setEditablePassword((editablePassword) => ({ ...editablePassword, oldPassword: e.target.value }))} placeholder="Digite a senha atual" required />
                                </div>
                                <span className={styles.errorMessage} id="oldPasswordLine">{errorMessage}</span>
                                <div className={styles.formField}>
                                    <label htmlFor="editNewPassword">Nova Senha</label>
                                    <input type="password" id="editNewPassword" onChange={(e) => setEditablePassword((editablePassword) => ({ ...editablePassword, newPassword: e.target.value }))} placeholder="Digite a nova senha" required />
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="editNewPasswordVerify">Confirmar Senha</label>
                                    <input type="password" id="editNewPasswordVerify" onChange={(e) => setEditablePassword((editablePassword) => ({ ...editablePassword, newPasswordVerify: e.target.value }))} placeholder="Confirme a nova senha" required />
                                </div>
                                <span className={styles.errorMessage} id="newPasswordLine">{errorMessage}</span>


                                <button type="submit">Alterar</button>
                            </form>




                        </>
                    );
                    break;
                case 'configs':
                    pagePath = '/home'
                    pageContent = (
                        <>
                            < SectionHeader key={uuidv4()} title={"Configurações"} Icon={FaCog} />
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
                                <div className={styles.configOption} onClick={() => changePage('editProfile')}>
                                    <FaUserEdit className={styles.icon} />
                                    <span>Editar Perfil</span>
                                </div>
                                <div className={styles.configOption} onClick={() => changePage('editPassword')}>
                                    <RiLockPasswordFill className={styles.icon} />
                                    <span>Alterar Senha</span>
                                </div>
                            </div>



                        </>
                    );
                    break;
                default:
                    break;
            }

            if (pagePath) {
                window.history.replaceState(null, '', pagePath)
            }
            if (pageContent) {
                setPageContent(pageContent);
            }
        }




    }, [forceReloadTrigger, theme, externalPosts, editableProfile, editablePassword, errorMessage, newPhoto])

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
                            <div className={styles.BottomHeader}>
                                <span className={styles.followersOption} onClick={handleFollowing}><b>{followingCount}</b> Seguindo </span>
                                <span className={styles.followersOption} onClick={handleFollowers}><b>{user.followers}</b> Seguidores</span>
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
                        <SearchBox changePage={changePage} searchTerm={setSearchTerm} searchHashtag={setSearchHashtag} />
                        <div className={styles.suggestionBox}>
                            {usersSuggestion ? <><span className={styles.suggestionTitle}>Quem seguir</span>{usersSuggestion.map(suggestion => (<FollowLine key={suggestion.username} follower={createFollow(suggestion, access_token.current)} activeUserID={user.id} following={followingCount} setFollowing={setFollowingCount} small="true" />))}</> : <LoadingCircle />}
                        </div>
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