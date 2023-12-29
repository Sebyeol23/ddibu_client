import React, { useState, useEffect } from 'react';
import styles from '../styles/Main.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

function Main(){
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  async function fetchMoreData(){
    const newItems = await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/home/product', {
      params:{
        limit: 15,
        lastId: items[items.length-1].productId
      }
    });
    if(!newItems.data.length) setHasMore(false);
    else setItems([...items, ...newItems.data]);
  };

  useEffect(() => {
    async function fetchData(){
      try {
        const res = await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/home/product', {
          params:{
            limit: 15
          }
        });
        if(res.data.length < 15) setHasMore(false);
        setItems(res.data);        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
        {items.length > 0 ? items.map((item, index) => (
          <div className={styles.item} key={item.productId}>
            <div className={styles.image} />
            <div className={styles.data}>
              <div className={styles.name}>{item.title}</div>
              <div className={styles.price}>{item.price}</div>
            </div>
          </div>
        )) : null}
      </InfiniteScroll>
    </div>
  );
};

export default Main;