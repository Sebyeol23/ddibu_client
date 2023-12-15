import logo from './logo.svg';
import styles from './App.module.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.Header}><Header></Header></div>
      <div className={styles.Nav}><Nav></Nav></div>
      <div className={styles.Main}><Main></Main></div>
    </div>
  );
}

export default App;