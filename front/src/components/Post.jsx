import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaRetweet, FaRegBookmark, FaBookmark } from 'react-icons/fa'
import styles from './Post.module.css';
import { formattedDate, timeAgo } from '../controlller/dateController';
import { contentPostFormatter } from '../controlller/contentFormatterController';





const Post = ({ post, user }) => {

    const [hasLiked, setHasLiked] = useState(post.hasLiked);
    const [hasSaved, setHasSaved] = useState(post.hasSaved);
    const [hasReposted, setHasReposted] = useState(post.hasReposted);
    const [likes, setLikes] = useState(post.likes);
    const [reposts, setReposts] = useState(post.reposts);


    const handleLikeButton = async () => {

        if (hasLiked === false) {
            const result = await post.addLike();
            if (result) {
                setHasLiked(true);
                setLikes(likes + 1);
            }
        } else {
            const result = await post.removeLike();
            if (result) {
                setHasLiked(false);
                setLikes(likes - 1);
            }
        }
    }
    const handleRepostButton = async () => {
        if (hasReposted === false) {
            const result = await post.addRepost();
            if (result) {

                setHasReposted(true);
                setReposts(reposts + 1);
            }
        } else {
            const result = await post.removeRepost();
            if (result) {
                setHasReposted(false);
                setReposts(reposts - 1);
            }
        }
    }
    const handleSaveButton = async () => {
        if (hasSaved === false) {
            const result = await post.addSave();
            if (result) {
                setHasSaved(true);
            }
        } else {
            const result = await post.removeSave();
            if (result) {
                setHasSaved(false);
            }
        }
    }



    return (
        <>

            <div className={styles.post}>
                {post.isRepost ? <>
                    <div className={styles.repost}>
                        <span><FaRetweet className={styles.resizedIcon} /> {post.repostAuthor.id === user.id ? 'Voce' : post.repostAuthor.fullname} repostou</span>
                    </div>
                </> : <>

                </>}
                <div>
                </div>
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
                    <p dangerouslySetInnerHTML={{ __html: contentPostFormatter(post.content) }}></p>
                </div>
                <div className={styles.sendIdentify}><p>{`${formattedDate(post.createdData)} via ${post.source}`}</p></div>
                <div className={styles.botton}>
                    <div className={styles.optionButton} onClick={() => handleLikeButton()}>{hasLiked ? <FaHeart className={styles.LikeSelectedIcon} /> : <FaRegHeart className={styles.LikeIcon} />} {likes}</div>
                    <div className={styles.optionButton} onClick={() => handleRepostButton()}>{hasReposted ? <FaRetweet className={styles.RepostSelectedIcon} /> : <FaRetweet className={styles.RepostIcon} />} {reposts}</div>
                    <div className={styles.optionButton} onClick={() => handleSaveButton()}>{hasSaved ? <FaBookmark className={styles.SaveSelectedIcon} /> : <FaRegBookmark className={styles.SaveIcon} />}</div>
                </div>
            </div>
        </>
    );
}


export default Post;