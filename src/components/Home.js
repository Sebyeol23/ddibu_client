import styles from '../styles/Home.module.css';
import Header from './Header';
import Nav from './Nav';
import Main from './Main';

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.Header}><Header /></div>
      <div className={styles.Nav}><Nav /></div>
      <div className={styles.Main}><Main /></div>
    </div>
  );
}

export default Home;