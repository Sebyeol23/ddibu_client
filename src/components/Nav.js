import React from 'react';
import styles from '../styles/Nav.module.css';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <div className={styles.navDiv}>
            <div className={styles.home}>홈</div>
            <div className={styles.register}><Link className={styles.product} to={'/product'}>상품 등록</Link></div>
            <div className={styles.like}><Link className={styles.wishList} to={'/like'}>좋아요</Link></div>
            <div className={styles.chat}><Link className={styles.chatRoom} to={'/chat'}>채팅</Link></div>
            <div className={styles.my}><Link className={styles.profile} to={'/profile'}>마이페이지</Link></div>
            <div className={styles.air}>여백</div>
        </div>
    );
}

export default Nav;