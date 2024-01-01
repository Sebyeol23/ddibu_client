import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Product from './components/Product';
import Profile from './components/Profile';
import ProductInfo from './components/ProductInfo';
import WishList from './components/WishList';
import ChatRoom from './components/ChatRoom';
import TempChat from './components/TempChat';
import Chat from './components/Chat';
import axios from 'axios';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com', {
      cors: {
        origin: ['http://localhost:80', 'http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com'],
      },
    });

    setSocket(newSocket);

    async function storeSocket(socketId){
      try{
        await axios.post('http://ec2-15-164-97-56.ap-northeast-2.compute.amazonaws.com/api/socket/socket', {
          socketId: socketId
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
      }
      catch(error){
        console.log(error);
      }
    }

    newSocket.on('connect', ()=>{
      storeSocket(newSocket.id);
    })

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/product' element={<Product />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/product-info' element={<ProductInfo />}/>
        <Route path='/like' element={<WishList />}/>
        <Route path='/chat-room' element={<ChatRoom />}/>
        <Route path='/temp-chat' element={<TempChat socket={socket}/>}/>
        <Route path='/chat' element={<Chat socket={socket}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;