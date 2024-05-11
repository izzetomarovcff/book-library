import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useSelector } from 'react-redux'

function Cart() {
    const [data,setData] = useState(null)
    const {GeneralResponse} = useSelector(state=>state)
    useEffect(()=>{
        
        setData(GeneralResponse.cart)
    },[])
    return (
        <div className='cart'>
            <div className='header'> Səbət </div>
            <div className='cart-cards'>
                {data == null ? (<div className='mt-5 text-secondary fs-1'>Səbətdə Kitab Yoxdur!</div>) : (data.length == 0 ? (<div className='mt-5 text-secondary fs-1'>Səbətdə Kitab Yoxdur!</div>) : (
                    data.map((book, index) => {
                        return (
                            <Card data={book} key={index} />
                        )
                    })
                ))}
            </div>
        </div>
    )
}

export default Cart