import React from 'react';
import styles from './SectionHeader.module.css';



const SectionHeader = ({ title, Icon, small = false }) => {
    return (
        <>
            <div className={small ? styles.smallSectionHeader : styles.bigSectionHeader}>
                <div className={styles.leftSection}>
                    <Icon className={small ? styles.smallIcon : styles.bigIcon} />
                </div>
                <div className={styles.rightSection}>
                    <h1 className={small ? styles.smallTitle : styles.bigTitle}>{title}</h1>

                </div>

            </div>

        </>
    );
}


export default SectionHeader;