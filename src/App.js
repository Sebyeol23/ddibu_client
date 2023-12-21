import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;