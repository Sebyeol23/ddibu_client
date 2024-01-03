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
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl);

  useEffect(() => {
    const newSocket = io(`${apiUrl}`, {
      cors: {
        origin: ['http://localhost:80', `${apiUrl}`],
      },
    });

    setSocket(newSocket);

    async function storeSocket(socketId){
      try{
        await axios.post(`${apiUrl}/api/socket/socket`, {
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
  }, [apiUrl]);

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
        <Route path='/chat-room' element={<ChatRoom socket={socket}/>}/>
        <Route path='/temp-chat' element={<TempChat socket={socket}/>}/>
        <Route path='/chat' element={<Chat socket={socket}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;