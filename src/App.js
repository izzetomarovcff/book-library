import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { IsLogIn } from './Redux/actions'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import PrivateRoute from './privateroutes/PrivateRoute';
function App() {
  const dispatch = useDispatch(state=>state)
  const {GeneralResponse} = useSelector(state=>state)
  useEffect(()=>{
    const listen = onAuthStateChanged(auth,(user)=>{
      if(user){
        dispatch(IsLogIn(true))
      }else{
        dispatch(IsLogIn(false))
      }
    })
    return()=>{
      listen()
    }
  },[])
  return ( 
    <div className="App">
        <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route element={<PrivateRoute/>}>
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
              </Route>
            </Routes>
        <Footer/>

    </div>
  );
}

export default App;
