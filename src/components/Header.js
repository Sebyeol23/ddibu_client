import React from 'react';
import styles from '../styles/Header.module.css';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <div className={styles.headerDiv}>
            <div className={styles.searchBox}>
                <div className={styles.search}>검색창</div>
                <div className={styles.sort}>정렬</div>
                <div className={styles.categorize}>분류</div>
                <div className={styles.air}>여백</div>
            </div>
            <div className={styles.loginBox}>
                <Link className={styles.signUp} to={'/signup'}>회원가입</Link>
                <Link className={styles.signIn} to={'/signin'}>로그인</Link>
            </div>
        </div>
    );
}

export default Header;