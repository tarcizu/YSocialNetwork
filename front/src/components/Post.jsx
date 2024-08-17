import React, { useEffect } from 'react';
import styles from './Post.module.css'




const Post = ({ username = 'username', children = 'Conteúdo' }) => {



    return (
        <>

            <div className={styles.post}>
                <h2>{`@${username}`}</h2>
                <h1>{children}</h1>
            </div>




        </>
    );
}


export default Post;