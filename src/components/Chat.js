import { useLocation } from 'react-router-dom';
import styles from '../styles/Chat.module.css';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import getCurrentSQLDateTime from '../utils/datetime';

function Chat({socket}){
    const location = useLocation();
    const roomId = location.state && location.state.roomId;
    const partnerId = location.state && location.state.partnerId;
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const message = useRef();

    async function handleSendMessage(){
        const msg = message.current.value;
        message.current.value = null;

        try{
            await axios.post('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/chat/chat', 
                {
                    roomId: roomId,
                    date: getCurrentSQLDateTime(),
                    message: msg
                },
                {
                    headers: {
                    'Authorization': localStorage.getItem('token')
                    }
                }
            );
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        async function getMessage(){
            try{
                const res = await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/chat/chat', {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    },
                    params:{
                        roomId: roomId
                    }
                });
                setChats(res.data);
                setIsLoading(false);
            }
            catch(error){
                console.log(error);
            }
        }
        getMessage();

        if(!socket) return;
        socket.on('newChat', ()=>{
            getMessage();
        });

        return ()=>{
            socket.off('newChat');
        }
    }, [socket, roomId]);

    if(!socket) return (<div>Loading...</div>);
    return (
        <div className={styles.app}>
            <div className={styles.header}>{partnerId}</div>
            <div className={styles.window}>
                {isLoading ? null : chats.map((chat, index) => (
                    <div key={chat.id} className={chat.isSender ? styles.myChat : styles.partnerChat}>{chat.message}</div>
                ))}
            </div>
            <div className={styles.input}>
                <input
                    className={styles.inputMessage}
                    type="text"
                    placeholder="Type your message..."
                    ref={message}
                />
                <button className={styles.button} onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;