import React, { useState, useRef } from 'react';
import axios from 'axios';

function Product() {
  const [selectedFile, setSelectedFile] = useState(null);
  const title = useRef();
  const body = useRef();
  const price = useRef();

  function getCurrentSQLDateTime() {
    const now = new Date();
  
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
  
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    const sqlDateTime = `${now.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return sqlDateTime;
  }

  function handleFileChange(event){
    setSelectedFile(event.target.files[0]);
  };

  async function handleUpload(){
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', title.current.value);
      formData.append('body', body.current.value);
      formData.append('price', price.current.value);
      formData.append('date', getCurrentSQLDateTime());

      const response = await axios.post('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/product/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token')
        },
      });

      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input type='text' ref={title}></input>
      <input type='text' ref={body}></input>
      <input type='text' ref={price}></input>
      <button onClick={handleUpload}>상품 등록</button>
    </div>
  );
}

export default Product;
