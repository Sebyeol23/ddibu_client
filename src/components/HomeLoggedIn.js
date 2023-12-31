import styles from '../styles/Header.module.css';

function HeaderLoggedIn(props){
    function SignOut(){
        localStorage.removeItem("token");
        props.setLoggedIn(false);
    }
    return(
        <div className={styles.loginBox}>
            <div className={styles.userName}>{props.userName}</div>
            <div className={styles.signOut} onClick={SignOut}>로그아웃</div>
        </div>
    );
}

export default HeaderLoggedIn;