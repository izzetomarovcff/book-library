import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='login'>
        <div className="card shadow-sm">
            <form className='form' action="">
                <h4 className='text-primary mt-5 mb-3'>Giriş Et</h4>
                <input type="text" className='form-control mt-2 mb-2' placeholder='E-Mail'/>
                <input type="password" className='form-control mt-2 mb-2' placeholder='Şifrə'/>
                <button className='btn btn-primary w-100 mt-2 mb-2'>Giriş Et</button>
                <Link to={"/signup"} className='btn btn-outline-primary w-100 mb-5'>Yeni Hesab Yarat</Link>
            </form>
        </div>
    </div>
  )
}

export default Login