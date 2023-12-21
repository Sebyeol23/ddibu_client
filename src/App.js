import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Product from './components/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/product' element={<Product />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;