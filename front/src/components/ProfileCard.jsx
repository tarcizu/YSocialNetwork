import React, { useState } from 'react';
import styles from './ProfileCard.module.css';
import AvatarPhoto from './AvatarPhoto';
import { useNavigate } from 'react-router-dom';
import VerifyBadge from './VerifyBadge';






const ProfileCard = ({ profile, activeUserID = 0, following = null, setFollowing = null }) => {

    const navigate = useNavigate();
    const [followed, SetFollowed] = useState(profile.isFollowed);

    const handleFollow = async (e) => {

        const result = await profile.addFollower();
        if (result) {
            SetFollowed(true);


            setFollowing((following) => following + 1);
        }

    }
    const handleUnFollow = async (e) => {

        const result = await profile.removeFollower();
        if (result) {
            SetFollowed(false);

            setFollowing((following) => following - 1);
        }


    }


    return (
        <>


            <div className={styles.profileCard}>


                <div onClick={() => navigate(`/profile/${profile.username}`)} className={styles.photo}>
                    <AvatarPhoto key={profile.id} profileName={profile.shortFullname}>{profile.avatar}</AvatarPhoto >
                </div>
                <div className={styles.profileContent}>
                    <div className={styles.names}>
                        <span className={styles.name} onClick={() => navigate(`/profile/${profile.username}`)}>{profile.shortFullname} <span className={styles.badge}><VerifyBadge verifyLevel={profile.verify_level} /></span></span>

                    </div>



                    <div onClick={() => navigate(`/profile/${profile.username}`)} className={styles.username}>
                        <span>@{profile.username}</span>
                    </div>

                </div>

                {profile.id === activeUserID ? <div className={styles.followButton}></div> : followed ? <>
                    <div onClick={() => handleUnFollow()} className={styles.followButton}>
                        <button>Seguindo</button>
                    </div>
                </> : <>
                    <div onClick={() => handleFollow()} className={styles.followButton}>
                        <button>Seguir</button>
                    </div>
                </>}





            </div >
        </>
    );
}


export default ProfileCard;