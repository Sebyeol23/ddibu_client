import React, {useRef} from 'react';
import styles from '../styles/SignUp.module.css';

function SignUp(){
    const id = useRef();
    const pw = useRef();

    function PostSignUp(){
        if(!id.current.value) console.log("input id");
        else if(!pw.current.value) console.log("input pw");
        else console.log("good");
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