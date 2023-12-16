import Home from './components/Home';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<div>This is sign in page</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;