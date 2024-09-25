import React from 'react';
import styles from './SectionHeader.module.css';



const SectionHeader = ({ title, Icon }) => {
    return (
        <>
            <div className={styles.sectionHeader}>
                <div className={styles.leftSection}>
                    <Icon className={styles.icon} />
                </div>
                <div className={styles.rightSection}>
                    <h1 className={styles.title}>{title}</h1>

                </div>

            </div>

        </>
    );
}


export default SectionHeader;