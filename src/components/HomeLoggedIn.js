import styles from '../styles/Header.module.css';

function HeaderLoggedIn(props){
    return(
        <div className={styles.loginBox}>
            <div className={styles.userName}>{props.userName}</div>
            <div className={styles.signOut}>로그아웃</div>
        </div>
    );
}

export default HeaderLoggedIn;