import { useLocation } from 'react-router-dom';
import styles from '../styles/Chat.module.css';

function TempChat(){
    const location = useLocation();
    const sellerId = location.state && location.state.sellerId;

    const handleSendMessage = () => {
        // if (newMessage.trim() === '') return;

        // setMessages([...messages, { text: newMessage, sender: 'user' }]);
        // setNewMessage('');
    }

    return (
        <div className={styles.app}>
            <div className={styles.header}>{sellerId}</div>
            <div className={styles.window}></div>
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

export default TempChat;