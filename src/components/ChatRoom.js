import styles from '../styles/ChatRoom.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChatRoom({socket}){
    const navigate = useNavigate();
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
        if(!socket) return;
        socket.on('newChatRoom', ()=>{
            getChatRoom();
        });

        return ()=>{
            socket.off('newChatRoom');
        }
    }, [socket]);

    return (
        <div className={styles.chatRoomBox}>
            {chatRooms.length ? 
            chatRooms.map((chatRoom, index) => (
                <div className={styles.chatRoom} key={chatRoom.roomId} onClick={()=>{navigate('../chat', {state: {roomId: chatRoom.roomId, partnerId: chatRoom.partnerId}});}}>{`${chatRoom.roomId} -> ${chatRoom.partnerId}`}</div>
            ))
            :null}
        </div>
    );
}

export default ChatRoom;