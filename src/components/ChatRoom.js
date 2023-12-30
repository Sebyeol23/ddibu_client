import styles from '../styles/ChatRoom.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatRoom(){
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        async function getChatRoom(){
            try {
                const res = await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/chat/chat-room', {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setChatRooms(res.data);      
            } catch (error) {
                console.log(error);
            }
        };
        getChatRoom();
    }, []);

    return (
        <div className={styles.chatRoomBox}>
            {chatRooms.length ? 
            chatRooms.map((chatRoom, index) => (
                <div className={styles.chatRoom} key={chatRoom.roomId}>{chatRoom.partnerId}</div>
            ))
            :null}
        </div>
    );
}

export default ChatRoom;