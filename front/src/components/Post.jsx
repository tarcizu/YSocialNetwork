import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaRetweet, FaRegBookmark, FaBookmark, FaLink } from 'react-icons/fa'
import styles from './Post.module.css';
import { formattedDate, timeAgo } from '../controller/dateController';
import { contentPostFormatter } from '../controller/contentFormatterController';
import AvatarPhoto from './AvatarPhoto';
import { useNavigate } from 'react-router-dom';
import VerifyBadge from './VerifyBadge';





const Post = ({ post, user = "", editable = true }) => {


    const navigate = useNavigate();
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
    const handleShare = async () => {
        console.log("Clicou em compartilhar");
        if (navigator.share !== undefined) {

            navigator.share({
                title: 'Postagem do Y',
                text: 'post.content',
                url: `/post/${post.author.username}/${post.id}`
            })
        }

    }



    return (
        <>

            <div className={styles.post}>
                {post.isRepost ? <>
                    <div className={styles.repost} >
                        <span onClick={() => navigate(`/profile/${post.repostAuthor.username}`)}><FaRetweet className={styles.resizedIcon} /> {post.repostAuthor.id === user.id ? 'Voce' : post.repostAuthor.fullname} repostou</span>
                    </div>
                </> : <>

                </>}
                <div>
                </div>
                <div className={styles.header}>
                    <div className={styles.avatarContainer} onClick={() => navigate(`/profile/${post.author.username}`)}>
                        <AvatarPhoto profileName={post.author.fullName}>{post.author.avatar}</AvatarPhoto>
                    </div>
                    <div className={styles.userContainer} >
                        <div>
                            <span id={styles.fullname} onClick={() => navigate(`/profile/${post.author.username}`)}>{post.author.fullname}</span>
                            <div className={styles.verifyBadge}>
                                <VerifyBadge verifyLevel={post.author.verify_level} />
                            </div>

                        </div>

                        <span id={styles.username} onClick={() => navigate(`/profile/${post.author.username}`)}>@{post.author.username}</span>
                    </div>
                    <span id={styles.timeAgo}>{timeAgo(post.createdData)}</span>


                </div>
                <div className={styles.content} onClick={() => navigate(`/post/${post.author.username}/${post.id}`)}>
                    <p dangerouslySetInnerHTML={{ __html: contentPostFormatter(post.content) }}></p>
                </div>
                <div className={styles.sendIdentify}><p>{`${formattedDate(post.createdData)} via ${post.source}`}</p></div>
                <div className={styles.botton}>
                    <div className={editable ? styles.optionButton : styles.disableOptionButton} onClick={editable ? () => handleLikeButton() : undefined}>{hasLiked ? <FaHeart className={styles.LikeSelectedIcon} /> : <FaRegHeart className={styles.LikeIcon} />}
                        <span>{likes}</span></div>
                    <div className={editable ? styles.optionButton : styles.disableOptionButton} onClick={editable ? () => handleRepostButton() : undefined}>{hasReposted ? <FaRetweet className={styles.RepostSelectedIcon} /> : <FaRetweet className={styles.RepostIcon} />}
                        <span>{reposts}</span>
                    </div>
                    <div className={editable ? styles.optionButton : styles.disableOptionButton} onClick={editable ? () => handleSaveButton() : undefined}>{hasSaved ? <FaBookmark className={styles.SaveSelectedIcon} /> : <FaRegBookmark className={styles.SaveIcon} />}</div>
                    <div className={styles.optionButton} onClick={() => handleShare()}> <FaLink /> </div>
                </div>
            </div>
        </>
    );
}


export default Post;