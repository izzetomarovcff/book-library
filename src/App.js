import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { IsLogIn } from './Redux/actions'
function App() {
  const dispatch = useDispatch(state=>state)
  useEffect(()=>{
    // here is auto login
  })
  return (
    <div className="App">
        <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
            </Routes>
        <Footer/>

    </div>
  );
}

export default App;
