import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'

function Favorite() {
    const [data,setData] = useState(null)
    const {GeneralResponse} = useSelector(state=>state)
    useEffect(()=>{
        
        setData(GeneralResponse.favorite)
    },[])
  return (
    <div className='favoritep'>
            <div className='header'> Sevimlilər </div>
            <div className='fav-cards'>
                {data == null ? (<div className='mt-5 text-secondary fs-1'>Sevimlilərdə Kitab Yoxdur!</div>) : (data.length == 0 ? (<div className='mt-5 text-secondary fs-1'>Sevimlilərdə Kitab Yoxdur!</div>) : (
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

export default Favorite