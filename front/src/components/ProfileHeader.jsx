import React, { useState } from 'react';
import styles from './ProfileHeader.module.css';
import AvatarPhoto from './AvatarPhoto';
import { formattedSignUpDate } from '../controlller/dateController';
import VerifyBadge from './VerifyBadge';




const ProfileHeader = ({ user, editable = true, changePage, targetID, targetUsername, activeUserID = 0 }) => {

    const [followed, SetFollowed] = useState(user.isFollowed);


    const handleFollow = async (e) => {

        const result = await user.addFollower();
        if (result) {
            SetFollowed(true);
        }

    }
    const handleUnFollow = async (e) => {

        const result = await user.removeFollower();
        if (result) {
            SetFollowed(false);
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




    return (
        <>
            <div className={styles.profileHeader}>
                <div className={styles.topContainer}>
                    <div className={styles.leftSection}>
                        <AvatarPhoto profileName={user.fullname}>{user.avatar}</AvatarPhoto>
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.topRightSection}>
                            <div className={styles.names}>
                                <div className={styles.nameBadge}>

                                    <span>{user.shortFullname} </span>
                                    <VerifyBadge verifyLevel={user.verify_level} />

                                </div>
                                <h2>@{user.username}</h2>
                            </div>
                            {editable && activeUserID !== user.id ? followed ?
                                < div className={styles.button} onClick={() => handleUnFollow()}>
                                    <button>Deixar de Seguir</button>
                                </div> : <div className={styles.button} onClick={() => handleFollow()}>
                                    <button>Seguir</button>
                                </div> : <></>

                            }
                        </div>
                        <div className={styles.bottomRightSection}>

                            <p onClick={() => handleFollowing()}><b>{user.following}</b> Seguindo </p>
                            <p onClick={() => handleFollowers()}><b>{user.followers}</b> Seguidores</p>
                        </div>

                    </div>
                </div>
                <div className={styles.middleContainer}>
                    <p>{user.bio}</p>

                </div>
                <div className={styles.bottomContainer}>
                    <p> Entrou em {formattedSignUpDate(user.createdData)}</p>
                </div>













            </div >


        </>
    );
}


export default ProfileHeader;