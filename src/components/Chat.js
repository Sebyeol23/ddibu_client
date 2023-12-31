import { useLocation } from 'react-router-dom';
import styles from '../styles/Chat.module.css';

function Chat(){
    const location = useLocation();
    const partnerId = location.state && location.state.partnerId;

    const handleSendMessage = () => {
        // if (newMessage.trim() === '') return;

        // setMessages([...messages, { text: newMessage, sender: 'user' }]);
        // setNewMessage('');
    }

    return (
        <div className={styles.app}>
            <div className={styles.header}>{partnerId}</div>
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

export default Chat;