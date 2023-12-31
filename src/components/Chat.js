import { useLocation } from 'react-router-dom';
import styles from '../styles/Chat.module.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Chat(){
    const location = useLocation();
    const roomId = location.state && location.state.roomId;
    const partnerId = location.state && location.state.partnerId;
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleSendMessage = () => {
        // if (newMessage.trim() === '') return;

        // setMessages([...messages, { text: newMessage, sender: 'user' }]);
        // setNewMessage('');
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
    }, []);

    return (
        <div className={styles.app}>
            <div className={styles.header}>{partnerId}</div>
            <div className={styles.window}>{isLoading ? null : chats[0].message}</div>
            <div className={styles.input}>
                <input
                    className={styles.inputMessage}
                    type="text"
                    placeholder="Type your message..."
                />
                <button className={styles.button} onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;