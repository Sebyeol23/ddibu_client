import styles from '../styles/ChatRoom.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChatRoom({socket}){
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        async function getChatRoom(){
            try {
                const res = await axios.get(`${apiUrl}/api/chat/chat-room`, {
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
            console.log("newChat")
            getChatRoom();
        });

        return ()=>{
            socket.off('newChatRoom');
        }
    }, [socket, apiUrl]);

    return (
        <div className={styles.window}>
            <div className={styles.chatRoomBox}>
                {chatRooms.length ? 
                    chatRooms.map((chatRoom, index) => (
                        <div
                            className={styles.chatRoom}
                            key={chatRoom.roomId}
                            onClick={() => {
                                navigate('../chat', { state: { roomId: chatRoom.roomId, partnerId: chatRoom.partnerId } });
                            }}
                        >
                            {`[${chatRoom.roomId}] ${chatRoom.partnerId}`}
                        </div>
                    ))
                : null}
            </div>
        </div>
    );
}

export default ChatRoom;
