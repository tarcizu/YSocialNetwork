import { MdVerified } from "react-icons/md";
import styles from './VerifyBadge.module.css';





const VerifyBadge = ({ verifyLevel }) => {




    return (
        <>
            <MdVerified className={`${styles.verifyIcon} ${styles[`level${verifyLevel}`]}`} />
        </>
    );
}


export default VerifyBadge;