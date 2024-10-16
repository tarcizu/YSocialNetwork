import React, { useRef, useState } from 'react';
import styles from './PostBox.module.css';
import { createPost } from '../services/post/createPostService';
import { logout } from '../controller/logoutController';
import { FaTrashAlt } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { UploadPhoto } from '../services/external/UploadPhotoService';



const PostBox = ({ access_token, navigate, changePage }) => {
    const imageInputRef = useRef(null);

    const [characterCounter, setCharacterCounter] = useState(0);
    const [postContent, setPostContent] = useState("");
    const [photoURL, setPhotoURL] = useState(null);
    const [photoBase64, setPhotoBase64] = useState(null);


    const handlePostPhotoSend = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoBase64(reader.result);
                setPhotoURL(URL.createObjectURL(file));
            }
            reader.readAsDataURL(file);
        }
    }
    const handleAddPhoto = async (e) => {
        e.preventDefault();
        imageInputRef.current.click();

    }
    const handleRemovePhoto = async (e) => {
        e.preventDefault();
        setPhotoURL(null);
        setPhotoBase64(null);
    }

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (characterCounter > 0) {
            let result = null;
            if (photoBase64) {
                const photoLink = await UploadPhoto(photoBase64);
                if (photoLink !== -1) {
                    result = await createPost(access_token, postContent, photoLink);
                }

            } else {
                result = await createPost(access_token, postContent, null);

            }
            if (result) {
                if (result === -1) {
                    console.log("Postagem não enviada: Erro Desconhecido");
                } else if (result === -2) {
                    logout(navigate);

                } else {
                    console.log("Postagem enviada com sucesso!");
                    setCharacterCounter(0);
                    setPostContent("");
                    changePage();
                }
            }

        };

    }

    return (
        <>
            <form onSubmit={handleSubmitPost} className={styles.postForm}>


                <textarea name="post" id="post" maxLength='140' placeholder='O que você está pensando hoje?' autoComplete='off' onChange={(e) => {
                    setPostContent(e.target.value);
                    setCharacterCounter(e.target.value.length)
                }} value={postContent || ""} autoFocus></textarea>

                <div className={styles.controlArea}>
                    {photoURL ? <div className={styles.imageView}>
                        <img src={photoURL} alt="" />
                        <button className={styles.deleteImageButton} onClick={handleRemovePhoto}><FaTrashAlt className={styles.trashIcon} /></button>

                    </div> : <button className={styles.addImageButton} onClick={handleAddPhoto}><RiImageAddFill className={styles.imageIcon} /></button>}
                    <input type="file" onChange={handlePostPhotoSend} ref={imageInputRef} accept="image/*" className={styles.imageInput} />


                    <span>{characterCounter} / 140</span>
                    <button className={styles.postButton} type="submit" >Postar</button>

                </div>



            </form>



        </>
    );
}


export default PostBox;