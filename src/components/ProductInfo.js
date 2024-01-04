import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ProductInfo.module.css';

function ProductInfo() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { search } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [productInfo, setProductInfo] = useState();
    const queryParams = new URLSearchParams(search);
    const productId = queryParams.get('pid');

    async function navigateToChatRoom() {
        try {
            const res = await axios.get(`${apiUrl}/api/home/chat-room`,
                {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    params: {
                        productId: productId
                    }
                }
            );
            if (res.data.roomId) {
                navigate('../chat', { state: { roomId: res.data.roomId, partnerId: productInfo.sellerId } });
            }
            else {
                navigate('../temp-chat', { state: { productId: productId, sellerId: productInfo.sellerId } });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function postLike() {
        try {
            await axios.post(`${apiUrl}/api/home/like`,
                {
                    productId: productId
                },
                {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getProductInfo() {
            try {
                const res = await axios.get(`${apiUrl}/api/home/product-info`, {
                    params: {
                        productId: productId
                    }
                });
                setProductInfo(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getProductInfo();
    }, [productId, apiUrl]);

    if (isLoading) return (<div className={styles.loading}>Loading...</div>);
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer} style={{ backgroundImage: `url(data:image/${productInfo.extension};base64,${productInfo.image})` }}></div>
            <div className={styles.productDetails}>
                <div className={styles.title}>{productInfo.title}</div>
                <div className={styles.body}>{productInfo.body}</div>
                <div className={styles.price}>가격: {productInfo.price}원</div>
                <div className={styles.date}>등록일: {productInfo.date.replace('T', ' ').replace('Z', '')}</div>
                <div className={styles.seller}>판매자: {productInfo.sellerId}</div>
                <div className={styles.status}>상태: {productInfo.status ? '판매완료' : '판매중'}</div>
                {productInfo.tag ? <div className={styles.tag}>태그: {productInfo.tag.map((tag, index) => <span key={index}>#{tag} </span>)}</div> : null}
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.likeButton} onClick={postLike}>좋아요</button>
                <button className={styles.chatButton} onClick={navigateToChatRoom}>채팅</button>
            </div>
        </div>
    );
}

export default ProductInfo;
