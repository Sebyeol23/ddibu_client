import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styles from '../styles/Chat.module.css';
import axios from 'axios';
import getCurrentSQLDateTime from '../utils/datetime';

function TempChat({socket}){
    const navigate = useNavigate();
    const location = useLocation();
    const productId = location.state && location.state.productId;
    const sellerId = location.state && location.state.sellerId;
    const message = useRef();

    async function handleSendMessage(){
        const msg = message.current.value;
        message.current.value = null;

        try{
            await axios.post('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/home/chat-room', 
                {
                    productId: productId,
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
        if(!socket) return;
        socket.on('newChatRoom', (roomId)=>{
            navigate('../chat', {
                state: {roomId: roomId, partnerId: sellerId},
                replace: true
            });
        });

        return ()=>{
            socket.off('newChatRoom');
        }
    }, [socket, navigate, sellerId]);

    if(!socket) return (<div>Loading...</div>);
    return (
        <div className={styles.app}>
            <div className={styles.header}>{sellerId}</div>
            <div className={styles.window}></div>
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

export default TempChat;