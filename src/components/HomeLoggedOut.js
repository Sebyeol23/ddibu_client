import styles from '../styles/Header.module.css';
import {Link} from 'react-router-dom';

function HeaderLoggedOut(){
    return(
        <div className={styles.loginBox}>
            <Link className={styles.signUp} to={'/signup'}>회원가입</Link>
            <Link className={styles.signIn} to={'/signin'}>로그인</Link>
        </div>
    );
}

export default HeaderLoggedOut;