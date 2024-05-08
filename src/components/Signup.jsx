import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='signup'>
        <div className="card shadow-sm">
            <form className='form' action="">
                <h4 className='text-primary mt-5 mb-3'>Qeydiyyatdan Keç</h4>
                <input type="text" className='form-control mt-2 mb-2' placeholder='Ad Soyad'/>
                <input type="text" className='form-control mt-2 mb-2' placeholder='E-Mail'/>
                <input type="text" className='form-control mt-2 mb-2' placeholder='Telefon Nömrəsi'/>
                <input type="password" className='form-control mt-2 mb-2' placeholder='Şifrə'/>
                <button className='btn btn-primary w-100 mt-2 mb-2'>Qeydiyyatdan Keç</button>
                <Link to={"/login"} className='btn btn-outline-primary w-100 mb-5'>Artıq Hesabım Var</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup