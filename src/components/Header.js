import React from 'react';
import styles from '../styles/Header.module.css';

function Header(){
    return(
        <div className={styles.headerDiv}>
            <div className={styles.searchBox}>This section is searchBox</div>
            <div className={styles.loginBox}>This section is loginBox</div>
        </div>
    );
}

export default Header;