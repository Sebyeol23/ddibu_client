import React from 'react';
import styles from '../styles/Header.module.css';

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
                <div className={styles.signUp}>회원가입</div>
                <div className={styles.signIn}>로그인</div>
            </div>
        </div>
    );
}

export default Header;