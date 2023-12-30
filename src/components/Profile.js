import React, {useRef, useEffect, useState} from 'react';
import styles from '../styles/SignUp.module.css';
import axios from 'axios';

function Profile(){
    const name = useRef();
    const location = useRef();
    const [originalName, setOriginalName] = useState();
    const [originalLocation, setOriginalLocation] = useState();

    useEffect(() => {
        async function getProfile(){
            try {
                const res = await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/profile/user', {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setOriginalName(res.data.name);
                setOriginalLocation(res.data.location);
            } catch (error) {
                console.log(error);
            }
        };
        getProfile();
    }, []);

    async function UpdateProfile(){
        if(!name.current.value) console.log("input new name");
        else{
            try{
                await axios.put('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/profile/user',
                {
                    newName: name.current.value,
                    newLocation: location.current.value === '' ? null : location.current.value
                },
                {
                    headers: {
                      'Authorization': localStorage.getItem('token')
                    },
                });
            } catch(error){
                console.error(error);
            }
        }
    }
    return(
        <div className={styles.page}>
            <div className={styles.box}>
                <div className={styles.head}>프로필</div>
                <div className={styles.body}>
                    <input type='text' ref={name} defaultValue={originalName}></input>
                    <input type='text' ref={location} defaultValue={originalLocation}></input>
                    <button onClick={UpdateProfile}>수정</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;