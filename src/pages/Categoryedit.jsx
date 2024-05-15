import React, { useEffect, useState } from 'react'

function Categoryedit() {
    const [categorydata, setCategoryData] = useState(null)
    const [activeEdit, setActiveEdit] = useState(false)
    const [activeNew, setActiveNew] = useState(false)
    const [category, setCategory] = useState({
        id: "",
        category_name: "test"
    })
    useEffect(() => {
        fetch("http://localhost:3001/getcategory")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setCategoryData(data)
            })
        }, [])
    const delCategory = (id) => {
        fetch('http://localhost:3001/delcategory', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => response.json())
            .then(data => {
                fetch("http://localhost:3001/getcategory")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setCategoryData(data)
            })

            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    }
    const startEdit = (recivedcategory) => {
        setActiveEdit(true)
        setCategory(prevState => ({
            ...prevState,
            id: Number(recivedcategory.id),
            category_name: recivedcategory.category_name
        }))
    }
    const startNew = () => {
        setActiveNew(true)
        setCategory(prevState => ({
            ...prevState,
            id: 0,
            category_name: ""
        }))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(category)
    }
    const handleEdit = (id) => {
        id.preventDefault()
        fetch('http://localhost:3001/editcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
            .then(response => response.json())
            .then(data => {
                setActiveEdit(false)
                fetch("http://localhost:3001/getcategory")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setCategoryData(data)
            })

            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    }
    const handleSubmitCategory = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/newcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
            .then(response => response.json())
            .then(data => {
                setActiveNew(false)
                fetch("http://localhost:3001/getcategory")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setCategoryData(data)
            })
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });
    }
    return (
        <div className='categoryedit'>
            {activeEdit ? (
                <div className="categorymodal">
                    <div className="categoryform">
                        <div className="closemodal" onClick={() => { setActiveEdit(false) }}>
                            <img src="icon/delete.svg" alt="" />
                        </div>
                        <form className='form-control form' onSubmit={handleEdit}>
                            <input type="text" name='category_name' className='form-control mt-3' value={category.category_name} onChange={handleChange} required placeholder='Kategoriya adı' />
                            <button className='btn btn-primary' type='submit'>Dəyiş</button>
                        </form>
                    </div>
                </div>
            ) : (null)}
            {activeNew ? (
                <div className="categorymodal">
                    <div className="categoryform">
                        <div className="closemodal" onClick={() => { setActiveNew(false) }}>
                            <img src="icon/delete.svg" alt="" />
                        </div>
                        <form className='form-control form' onSubmit={handleSubmitCategory}>
                            <input type="text" name='category_name' className='form-control mt-3' value={category.category_name} onChange={handleChange} required placeholder='Kategoriya adı' />
                            <button className='btn btn-primary' type='submit'>Əlavə Et</button>
                        </form>

                    </div>
                </div>
            ) : (null)}
            <div className='buttons mt-2 mb-4'>
                <button className='btn btn-primary' onClick={startNew}>Əlavə Et</button>
            </div>
            <table className='shadow border'>
                <thead>
                    <tr className='table100-head'>
                        <th className='column1'>ID</th>
                        <th className='column2'>Kategoriya Adı</th>
                        <th className='column3'>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {categorydata == null ? (null) : (
                        categorydata.map((category, categorykey) => {
                            return (
                                <tr className='table100-body' key={categorykey}>
                                    <td className='record1'>{category.id}</td>
                                    <td className='record2'>{category.category_name}</td>
                                    <td className=' record3'><button className='btn btn-danger btn-sm m-3' onClick={() => delCategory(category.id)}>Sil</button><button className='btn btn-primary btn-sm m-3' onClick={() => { startEdit(category) }}>Dəyiş</button></td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Categoryedit