import React from 'react';
import styles from '../styles/Nav.module.css';

function Nav(){
    return(
        <div className={styles.navDiv}>
            <div className={styles.home}>홈</div>
            <div className={styles.register}>상품 등록</div>
            <div className={styles.like}>좋아요</div>
            <div className={styles.chat}>채팅</div>
            <div className={styles.my}>마이페이지</div>
            <div className={styles.air}>여백</div>
        </div>
    );
}

export default Nav;