import React, { useEffect } from 'react';
import styles from './ScrollBackButton.module.css';
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from 'react';



const ScrollBackButton = (props) => {
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        window.addEventListener('scroll', changeVisible);

    }, [])

    const changeVisible = async (e) => {
        if (window.scrollY > 300) {
            setVisible(true);
        }
        else {
            setVisible(false);

        }

    }

    const scrollUp = async (e) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }



    return (
        <>

            {
                visible ?
                    <div className={styles.scrollBackContainer}>

                        <button className={styles.scrollBackButton} onClick={scrollUp}><FaArrowAltCircleUp /></button>

                    </div> : <></>

            }


        </>
    );
}


export default ScrollBackButton;