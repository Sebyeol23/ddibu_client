import React, { useState } from 'react';
import axios from 'axios';

function Product() {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event){
    setSelectedFile(event.target.files[0]);
  };

  async function handleUpload(){
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/product/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default Product;
