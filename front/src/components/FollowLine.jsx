import React, { useState } from 'react';
import styles from './FollowLine.module.css';
import AvatarPhoto from './AvatarPhoto';
import { useNavigate } from 'react-router-dom';
import VerifyBadge from './VerifyBadge';





const FollowLine = ({ follower, user = "" }) => {

    const navigate = useNavigate();
    const [followed, SetFollowed] = useState(follower.isFollowed);

    const handleFollow = async (e) => {

        const result = await follower.addFollower();
        if (result) {
            SetFollowed(true);
        }

    }
    const handleUnFollow = async (e) => {
        console.log("Entrou em UnFollow");

        const result = await follower.removeFollower();
        if (result) {
            SetFollowed(false);
        }


    }


    return (
        <>


            <div className={styles.follower}>

                <div className={styles.leftContainer}>
                    <div onClick={() => navigate(`/profile/${follower.user.username}`)} className={styles.photo}>
                        <AvatarPhoto profileName={follower.user.shortFullname}>{follower.user.avatar}</AvatarPhoto>
                    </div>
                    <div className={styles.names}>
                        <div>
                            <span onClick={() => navigate(`/profile/${follower.user.username}`)} className={styles.name}>{follower.user.shortFullname}</span>
                            <VerifyBadge verifyLevel={follower.user.verify_level} />
                        </div>
                        <span onClick={() => navigate(`/profile/${follower.user.username}`)} className={styles.username}>@{follower.user.username}</span>
                    </div>
                </div>
                {followed ? <>
                    <div onClick={() => handleUnFollow()} className={styles.followButton}>
                        <button>Deixar de Seguir</button>
                    </div>
                </> : <>
                    <div onClick={() => handleFollow()} className={styles.followButton}>
                        <button>Seguir</button>
                    </div>
                </>}




            </div>
        </>
    );
}


export default FollowLine;