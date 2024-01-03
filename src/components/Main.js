import React, { useState, useEffect } from 'react';
import styles from '../styles/Main.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Main(){
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  async function fetchMoreData(){
    const res = await axios.get(`${apiUrl}/api/home/product`, {
      params:{
        limit: 15,
        lastId: items[items.length-1].productId
      }
    });
    if(!res.data.length) setHasMore(false);
    else setItems([...items, ...res.data]);
  };

  useEffect(() => {
    async function fetchData(){
      try {
        const res = await axios.get(`${apiUrl}/api/home/product`, {
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
  }, [apiUrl]);

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
          <div className={styles.item} key={item.productId} onClick={()=>navigate(`/product-info?pid=${item.productId}`)}>
            <div className={styles.image} style={{ backgroundImage: `url(data:image/${item.extension};base64,${item.image})` }}>
            </div>
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