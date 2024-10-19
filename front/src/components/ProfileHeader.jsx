import React, { useState } from 'react';
import styles from './ProfileHeader.module.css';
import AvatarPhoto from './AvatarPhoto';
import { formattedSignUpDate } from '../controller/dateController';
import VerifyBadge from './VerifyBadge';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUserEdit, FaLink, FaShareAlt } from "react-icons/fa"



const ProfileHeader = ({ user, editable = true, changePage, targetID, targetUsername, activeUserID = 0, following = null, setFollowing = null }) => {

    const [followed, SetFollowed] = useState(user.isFollowed);
    const [followers, SetFollowers] = useState(parseInt(user.followers))
    const [menuVisibility, setMenuVisibility] = useState(false);


    const handleFollow = async (e) => {

        const result = await user.addFollower();
        if (result) {
            SetFollowed(true);
            setFollowing((following) => following + 1);
            SetFollowers((followers) => followers + 1);
        }

    }
    const handleUnFollow = async (e) => {

        const result = await user.removeFollower();
        if (result) {
            SetFollowed(false);
            setFollowing((following) => following - 1);
            SetFollowers((followers) => followers - 1);
        }


    }
    const handleFollowing = async (e) => {


        targetID.current = user.id;
        targetUsername.current = user.username;
        changePage('following');



    }
    const handleFollowers = async (e) => {
        targetID.current = user.id;
        targetUsername.current = user.username;
        changePage('followers');

    }

    const handleEditProfileButton = async (e) => {
        changePage('editProfile');
    }

    const handleShareButton = async () => {

        if (navigator.share !== undefined) {

            navigator.share({
                title: 'Perfil do Y',
                text: `@${user.username}`,
                url: `/profile/${user.username}`
            })
        }
    }
    const handleCopyLinkButton = async () => {

        if (navigator.clipboard !== undefined) {
            navigator.clipboard.writeText(window.location.origin + `/profile/${user.username}`);
        }
        console.log("Link Copiado para Area de Transferência");

    }


    const showMenu = async () => {
        setMenuVisibility(true);
    }
    const hideMenu = async () => {
        setMenuVisibility(false);
    }



    return (
        <>
            <div className={styles.profileHeader}>
                <div className={styles.leftContainer}>
                    <AvatarPhoto profileName={user.fullname}>{user.avatar}</AvatarPhoto>
                </div>
                <div className={styles.rightContainer}>

                    <div className={styles.topSection}>
                        <div className={styles.leftSide}>
                            <div className={styles.names}>
                                <div className={styles.nameBadge}>

                                    <span>{user.shortFullname} </span>
                                    <VerifyBadge verifyLevel={user.verify_level} />

                                </div>
                                <h2>@{user.username}</h2>
                            </div>
                            <div className={styles.follows}>
                                <p className={styles.followersOption} onClick={() => handleFollowing()}><b>{user.following}</b> Seguindo </p>
                                <p className={styles.followersOption} onClick={() => handleFollowers()}><b>{followers}</b> Seguidores</p>

                            </div>
                        </div>

                        <div className={styles.rightSide}>
                            {editable && activeUserID !== user.id ? followed ?
                                < div className={styles.button} onClick={() => handleUnFollow()}>
                                    <button>Deixar <br />de Seguir</button>
                                </div> : <div className={styles.button} onClick={() => handleFollow()}>
                                    <button>Seguir</button>
                                </div> : <></>

                            }
                            <HiDotsHorizontal className={styles.dropdownMenuButton} onClick={showMenu} />
                        </div>

                    </div>






                    <div className={styles.middleSection}>
                        <p>{user.bio}</p>
                    </div>
                    <div className={styles.bottomSection}>
                        <p> Membro desde {formattedSignUpDate(user.createdData)} - {user.postCount > 0 ? `Já fez ${user.postCount} Postagens` : `Ainda não fez postagens`}</p>
                    </div>

                </div>
                {menuVisibility ? <div onMouseLeave={hideMenu} className={styles.dropdownMenu}>
                    {editable && activeUserID === user.id ? <div className={styles.dropdownMenuOption} onClick={() => handleEditProfileButton()}>
                        <FaUserEdit />
                        <span>Editar Perfil</span>
                    </div> : <></>}
                    <div className={styles.dropdownMenuOption} onClick={() => handleCopyLinkButton()}>
                        <FaLink />
                        <span>Copiar Link</span>
                    </div>
                    <div className={styles.dropdownMenuOption} onClick={() => handleShareButton()}>
                        <FaShareAlt />
                        <span>Compartilhar</span>
                    </div>
                </div> : <></>}
            </div>











        </>
    );
}


export default ProfileHeader;