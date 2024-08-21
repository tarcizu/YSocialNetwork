import React, { useState } from 'react';
import styles from './PostField.module.css';
import { createPost } from '../services/post/createPostService';
import { logout } from '../controlller/logoutController';



const PostField = ({ access_token, navigate, changePage }) => {

    const [characterCounter, setCharacterCounter] = useState(0);
    const [postContent, setPostContent] = useState("");

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (characterCounter > 0) {

            const result = await createPost(access_token, postContent, null);
            if (result === -1) {
                console.log("Postagem não enviada: Erro Desconhecido");
            } else if (result === -2) {
                console.log("Usuário não Autenticado: Erro 401");
                logout(navigate);

            } else {
                console.log("Postagem enviada com sucesso!");
                setCharacterCounter(0);
                setPostContent("");
                changePage();
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
                    <span>{characterCounter} / 140</span>
                    <button className={styles.postButton} type="submit" >Postar</button>

                </div>



            </form>



        </>
    );
}


export default PostField;