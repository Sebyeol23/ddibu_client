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
  const [items, setItems] = useState(Array.from({ length: 15 }, (_, index) => `Item ${index + 1}`));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, index) => `Item ${items.length + index + 1}`);
      setItems([...items, ...newItems]);

      if (items.length >= 50) {
        setHasMore(false);
      }
    }, 1500);
  };

  return (
    <div className={styles.mainDiv}>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more items</p>}
      >
        {items.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '10px' }}>
            {item}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Main;