import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { IsLogIn, SetUser } from './Redux/actions'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import PrivateRoute from './privateroutes/PrivateRoute';
import Books from './pages/Books';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Favorite from './pages/Favorite';
import PrivateRouteAdmin from './privateroutes/PrivateRouteAdmin';
import Categoryedit from './pages/Categoryedit';
import Bookedit from './pages/Bookedit';
function App() {
  const dispatch = useDispatch(state => state)
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(IsLogIn(true))
        dispatch(SetUser(user))
      } else {
        dispatch(IsLogIn(false))
        dispatch(SetUser(null))
      }
    })
    return () => {
      listen()
    }
  }, [])
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<PrivateRouteAdmin />}>
          <Route path='/bookedit' element={<Bookedit />} />
          <Route path='/categoryedit' element={<Categoryedit />} />
          <Route path='/admin' element={<Admin />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favorite' element={<Favorite />} />

        <Route element={<PrivateRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
