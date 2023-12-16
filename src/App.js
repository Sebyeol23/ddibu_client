import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div><Home /></div>}/>
        <Route path='/signup' element={<div>This is sign up page</div>}/>
        <Route path='/signin' element={<div>This is sign in page</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;