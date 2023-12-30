import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Product from './components/Product';
import Profile from './components/Profile';
import ProductInfo from './components/ProductInfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:80', {
      cors: {
        origin: ['http://localhost:80']
      }
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('clientMessage', 'Hello Server!');
    });

    socket.on('serverMessage', (message) => {
      console.log('Received message from server:', message);
    });

    return () => {
      socket.disconnect();
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;