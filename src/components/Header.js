import React from 'react';
import styles from '../styles/Header.module.css';

function Header(){
    return(
        <div className={styles.headerDiv}>
            <h1 className={styles.headerH1}>This section is header</h1>
        </div>
    );
}

export default Header;