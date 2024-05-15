import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';

function Login() {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleLogIn = async()=>{
    try{
      await signInWithEmailAndPassword(auth,formData.email,formData.password)
      window.location = "/"
    }catch(error){
      console.log(error)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    handleLogIn()
  }
  return (
    <div className='login'>
        <div className="card shadow-sm">
            <form className='form mb-4' onSubmit={handleSubmit}>
                <h4 className='text-primary mt-5 mb-3'>Giriş Et</h4>
                <input type="text" className='form-control mt-2 mb-2' name='email' value={formData.email} onChange={handleChange} placeholder='E-Mail'/>
                <input type="password" className='form-control mt-2 mb-2' name='password' value={formData.password} onChange={handleChange} placeholder='Şifrə'/>
                <button type='submit' className='btn btn-primary w-100 mt-2 mb-2'>Giriş Et</button>
                <Link to={"/signup"} className='btn btn-outline-primary w-100 '>Yeni Hesab Yarat</Link>
                <div className='d-flex mt-4'>
                <Link to={"/"}>Əsas Səhifəyə qayıt</Link>
                <span className='text-primary ms-2 me-2'>•</span>
                <Link to={"/"}>Şifrəmi Unutdum?</Link>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default Login