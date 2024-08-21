import React from 'react';
import styles from './LoadingCircle.module.css'



const LoadingCircle = (props) => {
    return (
        <div className={styles.container}>

            <div className={styles.loadingCircle}></div>

        </div>


    );
}


export default LoadingCircle;