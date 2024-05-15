import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useSelector } from 'react-redux'

function Books() {
    const {GeneralResponse} = useSelector(state=>state)
    const [search, setSearch] = useState({
        search:""
    })
    const [data, setData] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/search",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(search)
        })
        .then(response => response.json())
        .then(data=>{
            setData(data)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
        fetch("http://localhost:3001/getbooks")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data)
            })
    }, [])

     const handleSearchChange = (e)=>{
        const { name, value } = e.target;
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }))
     }
    return (
        <div className='books'>
            <form className='w-50 d-flex mt-3' onSubmit={handleSubmit}>
                <div className="input-group mb-3 w-100">
                    <input type="text" className="form-control berder border-primary" placeholder="Kitab Adı, Müəllif Adı və s. Axtar" value={search.search} name='search' onChange={handleSearchChange} />
                    <button className="btn btn-primary" type="submit">Axtar</button>
                </div>
            </form>
            <div className='header'> Kiatablar </div>
            <div className='book-cards'>
                
                {data == null ? (<div className='mt-5 text-secondary fs-1'>Data Base Də Kitab Yoxdur!</div>) : (data.length == 0 ? (<div className='mt-5 text-secondary fs-1'>Data Base Də Kitab Yoxdur!</div>) : (
                    data.map((book, index) => {
                        return (
                            <Card data={book} key={index} />
                        )
                    })
                )

                )}
            </div>
        </div>
    )
}

export default Books