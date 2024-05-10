import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase';

function Signup() {
  const [formData,setFormData] = useState({
    fullname:"",
    phone:"",
    email:"",
    password:""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(formData)
  }
  const handleSignUp = async () =>{
    try{
      await createUserWithEmailAndPassword(auth,formData.email, formData.password)
      window.location = "/"
    }catch(error){
      console.log(error)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    handleSignUp()
  }
  return (
    <div className='signup'>
        <div className="card shadow-sm">
            <form onSubmit={handleSubmit} className='form mb-4'>
                <h4 className='text-primary mt-5 mb-3'>Qeydiyyatdan Keç</h4>
                <input type="text" name='fullname' className='form-control mt-2 mb-2' onChange={handleChange} placeholder='Ad Soyad' autoComplete='off' required/>
                <input type="tel" name='phone' className='form-control mt-2 mb-2' onChange={handleChange} placeholder='Telefon Nömrəsi' autoComplete='off' required/>
                <input type="email" name='email' className='form-control mt-2 mb-2' onChange={handleChange} placeholder='E-Mail' autoComplete='off' required/>
                <input type="password" name='password' className='form-control mt-2 mb-2' onChange={handleChange} placeholder='Şifrə' autoComplete='off' required/>
                <button type='submit' className='btn btn-primary w-100 mt-2 mb-2'>Qeydiyyatdan Keç</button>
                <Link to={"/login"} className='btn btn-outline-primary w-100 '>Artıq Hesabım Var</Link>
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

export default Signup