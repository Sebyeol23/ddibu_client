// import React from 'react';
// import styles from '../styles/Main.module.css';

// function Main(){
//     return(
//         <div className={styles.mainDiv}>
//             <h1 className={styles.mainH1}>This section is main</h1>
//         </div>
//     );
// }

// export default Main;

import React, { useState } from 'react';
import styles from '../styles/Main.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function Main(){
  const [items, setItems] = useState(Array.from({ length: 16 }, (_, index) => `Item ${index + 1}`));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 16 }, (_, index) => `Item ${items.length + index + 1}`);
      setItems([...items, ...newItems]);

      if (items.length >= 60) {
        setHasMore(false);
      }
    }, 1500);
  };

  return (
    <div className={styles.mainDiv}>
      <InfiniteScroll
        className={styles.scroll}
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className={styles.load}>Loading...</div>}
        endMessage={<div className={styles.end}>No more items</div>}
      >
        {items.map((item, index) => (
          <div className={styles.item}>
            <div className={styles.image} />
            <div className={styles.name}>
              시나모롤
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Main;