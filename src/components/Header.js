import React, {useEffect, useState} from 'react';
import styles from '../styles/Header.module.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Header(){
    const [isLoggedIn, setLoggedIn] = useState(false);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiLsnKDsoIAzMyIsImlhdCI6MTcwMzA1ODEyMiwiZXhwIjoxNzAzMDU4NzIyfQ.Xb5aZQM26pQOC9n1k7vV034QIRCTK_K36TRUnvkUB4M";

    async function auth(){
        await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/home/user', {
            headers: {
                Authorization: token
            }
        }).then(()=>{
            setLoggedIn(true);
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        auth();
    }, []);

    return(
        <div className={styles.headerDiv}>
            <div className={styles.searchBox}>
                <div className={styles.search}>검색창</div>
                <div className={styles.sort}>정렬</div>
                <div className={styles.categorize}>분류</div>
                <div className={styles.air}>여백</div>
            </div>
            <div className={styles.loginBox}>
                {isLoggedIn ? <p>로그인 했네</p> : <p>로그인 해라</p>}
                <Link className={styles.signUp} to={'/signup'}>회원가입</Link>
                <Link className={styles.signIn} to={'/signin'}>로그인</Link>
            </div>
        </div>
    );
}

export default Header;