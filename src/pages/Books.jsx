import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

function Books() {
    const [search, setSearch] = useState("")
    const [data, setData] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
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
                console.log(data)
                setData(data)
            })
    }, [])
    return (
        <div className='books'>
            <form className='w-50 d-flex mt-3' onSubmit={handleSubmit}>
                <div className="input-group mb-3 w-100">
                    <input type="text" className="form-control berder border-primary" placeholder="Kitab Adı, Müəllif Adı və s. Axtar" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <button className="btn btn-primary" type="submit">Axtar</button>
                </div>
            </form>
            <div className='header'> Kiatablar </div>
            <div className='book-cards'>
                {data == null ? (<div>Data Base Də Kitab Yoxdur!</div>) : (data.length == 0 ? (<div>Data Base Də Kitab Yoxdur!</div>) : (
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