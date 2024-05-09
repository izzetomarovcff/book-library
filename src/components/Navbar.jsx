import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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