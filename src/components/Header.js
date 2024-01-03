import React, {useEffect, useState} from 'react';
import styles from '../styles/Header.module.css';
import axios from 'axios';
import HeaderLoggedIn from './HomeLoggedIn';
import HeaderLoggedOut from './HomeLoggedOut';

function Header(){
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("유저");

    useEffect(()=>{
        async function auth(){
            await axios.get(`${apiUrl}/api/home/user`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then((res)=>{
                setUserName(res.data.userId);
                setLoggedIn(true);
            }).catch((error)=>{
                console.log(error);
            })
        }
        auth();
    }, [apiUrl]);

    return(
        <div className={styles.headerDiv}>
            <div className={styles.searchBox}>
                <div className={styles.search}>검색창</div>
                <div className={styles.sort}>정렬</div>
                <div className={styles.categorize}>분류</div>
                <div className={styles.air}>여백</div>
            </div>
            <div className={styles.loginBox}>
                {isLoggedIn ? <HeaderLoggedIn userName={userName} setLoggedIn={setLoggedIn}/> : <HeaderLoggedOut />}
            </div>
        </div>
    );
}

export default Header;