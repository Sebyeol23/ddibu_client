import React, {useRef} from 'react';
import styles from '../styles/SignUp.module.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function SignIn(){
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const id = useRef();
    const pw = useRef();

    async function PostSignIn(){
        if(!id.current.value) console.log("input id");
        else if(!pw.current.value) console.log("input pw");
        else{
            await axios.post(`${apiUrl}/api/account/sign-in`, {
                id: id.current.value,
                pw: pw.current.value
            }).then((res)=>{
                localStorage.setItem("token", res.data.token);
                navigate('../', {replace: true});
            }).catch((error)=>{
                console.log(error);
            });
        }
    }
    return(
        <div className={styles.page}>
            <div className={styles.box}>
                <div className={styles.head}>로그인</div>
                <div className={styles.body}>
                    <input className={styles.input} type='text' ref={id}></input>
                    <input className={styles.input} type='text' ref={pw}></input>
                    <button className={styles.button} onClick={PostSignIn}>로그인</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;