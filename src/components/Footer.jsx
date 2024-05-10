import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const [isSubscribed,setIsSubscribed] =useState(false)
  const handleSubmit = (e)=>{
    e.preventDefault()
    setIsSubscribed(true)
  }
  return (
    <div className='footer shadow pb-3'>
      <div className="links">
        <div className="info">
          <h5 className='text-primary'>Elektron Kitabxana</h5>
          <p className='text-secondary'>Kitabların Elektron Formada Əldə Edilməsi Üçün Yaradılmış WEB sayt</p>
          <p className='text-secondary'>&copy; 2024</p>
        </div>
        <div className="info">
          <h5 className='text-primary'>Xidmətlərimiz</h5>
          <Link to={"/"} className='text-secondary'>İllustrasiya</Link>
          <Link to={"/"} className='text-secondary'>Mobil Dizayn</Link>
          <Link to={"/"} className='text-secondary'>WEB Dizayn</Link>
          <Link to={"/"} className='text-secondary'>Development</Link>
          <Link to={"/"} className='text-secondary'>SEO</Link>
        </div>
        <div className="info">
          <h5 className='text-primary'>Şirkətimiz</h5>
          <Link to={"/"} className='text-secondary'>Xidmətlət</Link>
          <Link to={"/"} className='text-secondary'>Xüsusiyyətlər</Link>
          <Link to={"/"} className='text-secondary'>Komandamız</Link>
          <Link to={"/"} className='text-secondary'>Portfolio</Link>
          <Link to={"/"} className='text-secondary'>Blog</Link>
          <Link to={"/"} className='text-secondary'>Əlaqə</Link>
        </div>
        <div className="info">
          <h5 className='text-primary'>Yeniliklər Üçün Abunə Ol</h5>
          <form onSubmit={handleSubmit}>
            {isSubscribed? (<input type="email" className='form-control bg-light mt-2' placeholder='example@mail.com' value={""} autoComplete='off' required disabled/>):(<input type="email" className='form-control bg-light mt-2' placeholder='example@mail.com'  autoComplete='off' required />)}
            
            {isSubscribed?(<button type='submit' className='btn btn-success btn-sm mt-3' disabled>Abunə Olundu</button>):(<button type='submit' className='btn btn-outline-primary btn-sm mt-3'>Abunə Olun</button>)}
          </form>
        </div>
      </div>
      <hr size="4" className='w-75 hr hr-2 mx-auto text-primary mt-4' />
      <div className='footer-bottom mt-3'>
        <p className='text-secondary'>Developed By <Link to={"/"} className='text-primary'>Code Line</Link></p>
        <p className='text-secondary'>Bakı Şəhəri Xətai Rayonu Polad Həşimov 15A</p>
        <Link to={"mailto:elibrary@info.az"} className='text-primary'>elibrary@info.az</Link>
        <Link to={"https://wa.me/994709161820/"} className='text-primary'>+994 70 123 45 67</Link>
      </div>
    </div>
  )
}

export default Footer