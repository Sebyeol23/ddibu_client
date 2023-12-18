import React, {useRef} from 'react';
import styles from '../styles/SignUp.module.css';
import axios from 'axios';

function SignUp(){
    const id = useRef();
    const pw = useRef();

    async function PostSignUp(){
        if(!id.current.value) console.log("input id");
        else if(!pw.current.value) console.log("input pw");
        else{
            try{
                await axios.post('https://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/account/sign-up', {
                    id: id.current.value,
                    pw: pw.current.value
                });
            } catch(e){
                console.error(e);
            }
        }
    }
    return(
        <div className={styles.page}>
            <div className={styles.box}>
                <div className={styles.head}>회원가입</div>
                <div className={styles.body}>
                    <input type='text' ref={id}></input>
                    <input type='text' ref={pw}></input>
                    <button onClick={PostSignUp}>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;