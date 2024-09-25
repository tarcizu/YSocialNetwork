import React, { useEffect, useState } from 'react';
import styles from './AvatarPhoto.module.css'
import userAvatar from '../assets/images/User.png'



const AvatarPhoto = ({ children, profileName }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(children);
                if (res.ok) {
                    const img = new Image();
                    img.src = children
                    img.onload = () => setLoaded(true);
                    img.onerror = () => setError(true);
                } else {
                    setError(true);
                }

            } catch (error) {
                setError(true);
            }


        })()


    }, [children])

    return (
        <>
            {!error && loaded && (
                <img src={children} alt={profileName ? `${profileName}  Avatar` : 'Avatar'} className={styles.avatar} style={{ display: 'block' }} />
            )}
            {!loaded && (<img src={userAvatar} alt={'Loading'} className={styles.avatar} style={{ display: 'block' }} />)}

        </>
    );
}


export default AvatarPhoto;