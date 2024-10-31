import React, { useState } from 'react';
import styles from './TrendingLine.module.css';
import { useNavigate } from 'react-router-dom';







const TrendingLine = ({ trending, index, editable = true, changePage, searchHashtag }) => {

    let trendingName = trending.name.replace('#', '');
    trendingName = trendingName.replace(/([A-Z][a-z]+|\d+|[A-Z]+(?=[A-Z][a-z]|$))/g, ' $1')
    const navigate = useNavigate();

    const handleSearchHashtag = async (e) => {
        console.log(`Clicou na Hashtag ${trending.name}`);
        searchHashtag(trending.name);
        changePage('hashtag');

    }
    return (
        <>
            <div className={styles.trendingLine}>
                <div className={styles.trendingIndex}><span>{index}</span></div>
                <div className={styles.trendingData} onClick={handleSearchHashtag}>
                    <span className={styles.trendingName}>{trendingName}</span>
                    <span className={styles.trendingCount}>{trending.count} Publicações</span>
                </div>
            </div>

        </>
    );
}


export default TrendingLine;