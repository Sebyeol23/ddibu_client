import React, { useState, useRef } from 'react';
import axios from 'axios';
import getCurrentSQLDateTime from '../utils/datetime';
import styles from '../styles/Product.module.css';

function Product() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [selectedFile, setSelectedFile] = useState(null);
    const title = useRef();
    const body = useRef();
    const price = useRef();
    const [tags, setTags] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const addTag = () => {
        setTags([...tags, '']);
    };

    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const handleTagRemove = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    async function handleUpload() {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('title', title.current.value);
            formData.append('body', body.current.value);
            formData.append('price', price.current.value);
            formData.append('tag', JSON.stringify(tags));
            formData.append('date', getCurrentSQLDateTime());

            await axios.post(`${apiUrl}/api/product/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('token')
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input className={styles.input} type="file" onChange={handleFileChange} />
            </div>
            <div className={styles.inputGroup}>
                <input className={styles.input} type='text' ref={title} placeholder="상품 제목" />
            </div>
            <div className={styles.inputGroup}>
                <input className={styles.input} type='text' ref={body} placeholder="상품 설명" />
            </div>
            <div className={styles.inputGroup}>
                <input className={styles.input} type='text' ref={price} placeholder="상품 가격" />
            </div>
            <button className={styles.button} onClick={addTag}>태그 추가</button>
            <div className={styles.inputGroup}>
                {tags.map((tag, index) => (
                    <div key={`div${index}`} className={styles.tagBox}>
                        <input
                            key={index}
                            className={styles.input}
                            type='text'
                            placeholder="상품 태그"
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                        />
                        <button key={`button${index}`} onClick={(e) => handleTagRemove(index)}>X</button>
                    </div>
                ))}
            </div>
            <button className={styles.button} onClick={handleUpload}>상품 등록</button>
        </div>
    );
}

export default Product;