import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaRetweet, FaRegBookmark, FaBookmark } from 'react-icons/fa'
import styles from './Post.module.css';
import { formattedDate, timeAgo } from '../controlller/dateController';





const Post = ({ post }) => {

    const [hasLiked, setHasLiked] = useState(post.hasLiked);
    const [hasSaved, setHasSaved] = useState(post.hasSaved);
    const [hasReposted, setHasReposted] = useState(post.hasReposted);
    const [likes, setLikes] = useState(post.likes);
    const [reposts, setReposts] = useState(post.reposts);


    const handleLikeButton = async () => {
        post.like();
        setHasLiked(post.hasLiked)
    }



    return (
        <>

            <div className={styles.post}>
                <div className={styles.header}>
                    <div className={styles.avatarContainer}>
                        <img src={post.author.avatar} alt={post.author.username} />
                    </div>
                    <div className={styles.userContainer}>
                        <span id={styles.fullname}>{post.author.fullname}</span>
                        <span id={styles.username}>@{post.author.username}</span>
                    </div>
                    <span id={styles.timeAgo}>{timeAgo(post.createdData)}</span>


                </div>
                <div className={styles.content}>
                    <p>{post.content}</p>
                </div>
                <div className={styles.sendIdentify}><p>{`${formattedDate(post.createdData)} via ${post.source}`}</p></div>
                <div className={styles.botton}>
                    <div className={styles.optionButton} onClick={() => handleLikeButton()}>{hasLiked ? <FaHeart /> : <FaRegHeart />} {likes}</div>
                    <div className={styles.optionButton}><FaRetweet /> {reposts}</div>
                    <div className={styles.optionButton}><FaRegBookmark /></div>


                </div>
            </div>




        </>
    );
}


export default Post;