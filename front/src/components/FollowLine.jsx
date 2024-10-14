import React, { useState } from 'react';
import styles from './FollowLine.module.css';
import AvatarPhoto from './AvatarPhoto';
import { useNavigate } from 'react-router-dom';
import VerifyBadge from './VerifyBadge';
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";





const FollowLine = ({ follower, activeUserID = 0, following = null, setFollowing = null, small = false }) => {

    const navigate = useNavigate();
    const [followed, SetFollowed] = useState(follower.isFollowed);

    const handleFollow = async (e) => {

        const result = await follower.addFollower();
        if (result) {
            SetFollowed(true);


            setFollowing((following) => following + 1);
        }

    }
    const handleUnFollow = async (e) => {

        const result = await follower.removeFollower();
        if (result) {
            SetFollowed(false);

            setFollowing((following) => following - 1);
        }


    }


    return (
        <>


            <div className={small ? styles.followerSmall : styles.follower}>

                <div className={styles.leftContainer}>
                    <div onClick={() => navigate(`/profile/${follower.user.username}`)} className={small ? styles.photoSmall : styles.photo}>
                        <AvatarPhoto profileName={follower.user.shortFullname}>{follower.user.avatar}</AvatarPhoto>
                    </div>
                    <div className={small ? styles.namesSmall : styles.names}>
                        <div>
                            <span onClick={() => navigate(`/profile/${follower.user.username}`)} className={small ? styles.nameSmall : styles.name}>{follower.user.shortFullname}</span>
                            <VerifyBadge verifyLevel={follower.user.verify_level} />
                        </div>
                        <span onClick={() => navigate(`/profile/${follower.user.username}`)} className={styles.username}>@{follower.user.username}</span>
                    </div>
                </div>
                {follower.user.id === activeUserID ? <></> : followed ? <>
                    <div onClick={() => handleUnFollow()} className={small ? styles.followButtonSmall : styles.followButton}>
                        <button>Seguindo</button>
                    </div>
                </> : <>
                    <div onClick={() => handleFollow()} className={small ? styles.followButtonSmall : styles.followButton}>
                        <button>Seguir</button>
                    </div>
                </>}




            </div>
        </>
    );
}


export default FollowLine;