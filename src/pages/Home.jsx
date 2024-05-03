import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

function Home() {
  const [data, setData] = useState({
    bookname: "Səfillər",
    author: "Eşqin Camalov",
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam fuga iste sequi! Ratione, vero fuga.",
    oldprice: 30,
    price:25
  })
  return (
    <div className='homepage'>
      <Navbar />
      <Card data={data} />
    </div>
  )
}

export default Home