import { signOut } from 'firebase/auth'
import React from 'react'
import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

function Navbar() {
  const {GeneralResponse} = useSelector(state=>state)
  const handleLogOut = ()=>{
    signOut(auth).then(()=>{
      console.log("Uğurla Çıxış edildi!")
      window.location ="/"
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className='nav bg-light shadow-sm'>
        <div className="pages ms-5">
            <Link to={"/"} className='linkto'>Əsas Səhifə</Link>
            <Link to={"/books"} className='linkto'>Kitablar</Link>
            <Link to={"/cart"} className='linkto'>Səbət</Link>
            <Link to={"/favorite"} className='linkto'>Sevimlilər</Link>
            {GeneralResponse.user == null ? (null):(GeneralResponse.user.email == process.env.REACT_APP_FIREBASE_ADMIN_EMAIL ? (<><div className='linkto pointer'>||</div><Link to={"/categoryedit"} className='linkto'>Kategoriya</Link> <Link to={"/bookedit"} className='linkto'>Kitablar</Link></>):(null))}
        </div>
        {GeneralResponse.is_login ? (
          <div className='registery me-5'>
            <div to={"/login"} className='linkto' onClick={handleLogOut}>Çıxış Et</div>
          </div>
        ):(
          <div className='registery me-5'>
            <Link to={"/login"} className='linkto'>Giriş Et</Link>
            <Link to={"/signup"} className='linkto'>Qeydiyyat</Link>
          </div >
        )}
        
    </div>
  )
}

export default Navbar