import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ProductInfo.module.css';

function ProductInfo() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [productInfo, setProductInfo] = useState();
    const queryParams = new URLSearchParams(search);
    const productId = queryParams.get('pid');

    async function navigateToChatRoom(){
        try{
            const res = await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/home/chat-room',
                {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    params: {
                        productId: productId
                    }
                }
            );
            if(res.data.roomId){
                navigate('../chat', {state: {roomId: res.data.roomId, partnerId: productInfo.sellerId}});
            }
            else{
                navigate('../temp-chat', {state: {productId: productId, sellerId: productInfo.sellerId}});
            }
        }catch(error){
            console.log(error);
        }
    }

    async function postLike(){
        try{
            await axios.post('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/home/like', 
                {
                    productId: productId
                },
                {
                    headers: {
                    'Authorization': localStorage.getItem('token')
                    }
                }
            );
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        async function getProductInfo(){
            try{
                const res = await axios.get('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/home/product-info', {
                    params:{
                        productId: productId
                    }
                });
                setProductInfo(res.data);
                setIsLoading(false);
            }catch(error){
                console.log(error);
            }
        }
        getProductInfo();
    }, [productId]);

    if(isLoading) return(<div>Loading...</div>);
    return(
        <div>
            <div>제목: {productInfo.title}</div>
            <div>본문: {productInfo.body}</div>
            <div>가격: {productInfo.price}원</div>
            <div>등록일: {productInfo.date}</div>
            <div>판매자: {productInfo.sellerId}</div>
            <div>상태: {productInfo.status ? '판매완료' : '판매중'}</div>
            <div className={styles.image} style={{ backgroundImage: `url(data:image/${productInfo.extension};base64,${productInfo.image})` }}></div>
            <div className={styles.like} onClick={postLike}>좋아요</div>
            <div className={styles.like} onClick={navigateToChatRoom}>채팅</div>
        </div>       
    );
}

export default ProductInfo;
