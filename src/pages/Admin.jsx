import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { imageDb } from '../firebase';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
function Admin() {
    const [bookFormData, setBookFormData] = useState({
        book_image_url: '',
        book_category: '',
        book_name: '',
        book_author: '',
        book_summary: '',
        have_sale: false,
        old_price: "",
        price: ""
    });

    const [categoryFormData, setCategoryFormData] = useState({
        category_name: ""
    })

    const [categorydata, setCategoryData] = useState(null)

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

    const handleChangecategory = (e) => {
        const { name, value } = e.target;
        setCategoryFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangebook = (e) => {
        const { name, value, checked } = e.target;
        setBookFormData(prevState => ({
            ...prevState,
            [name]: (name === "old_price" || name === "price" ? (Number(value)) : (name === "have_sale" ? (checked) : (value)))
        }))
        console.log(bookFormData)
    }

    const handleSubmitBook = (e) => {
        e.preventDefault()
        const lastData = { ...bookFormData, have_sale: (bookFormData.have_sale ? (1) : (0)), old_price: (bookFormData.old_price == "" ? (0) : (bookFormData.old_price)) }
        fetch('http://localhost:3001/newbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lastData)
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload()
                setBookFormData(prevState => ({
                    ...prevState,
                    book_image_url: '',
                    book_category: '',
                    book_name: '',
                    book_author: '',
                    book_summary: '',
                    have_sale: false,
                    old_price: "",
                    price: ""
                }))
            })
            .catch(error => {
                console.error('Error adding book:', error);
            });
    }

    const handleSubmitCategory = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/newcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryFormData)
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload()
                setCategoryFormData(prevState => ({
                    ...prevState,
                    category_name: ""
                }))
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });
    }
    const handleImgUpload = async (e) => {
        const selectedFile = e.target.files[0]
        requestDataBase(selectedFile)
    }
    const requestDataBase = async (selFile) =>{
        const imgRef = ref(imageDb, `product/${v4()}`)
        try {
            await uploadBytes(imgRef, selFile)
            const downloadURL = await getDownloadURL(imgRef)
            setBookFormData(prevState => ({
                ...prevState,
                book_image_url: downloadURL
            }))

        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='admin mt-5 pt-5'>
            <form onSubmit={handleSubmitCategory} className=' form form-control w-50 mt-2'>
                <h4 className='mt-3 text-secondary'>Kategoriya Əlavə Et</h4>
                <input type="text" required name="category_name" value={categoryFormData.category_name} onChange={handleChangecategory} className='form-control mt-3' placeholder='Kategoriya Adı' autoComplete='off' />
                <button className='btn btn-primary mt-3 mb-2 w-50' type='submit'>Kategoriya Əlavə Et</button>
            </form>
            <form onSubmit={handleSubmitBook} className='form form-control w-50 mt-5'>
                <h4 className='mt-3 text-secondary'>Kitab Əlavə Et</h4>
                <input type="text" name='book_name' required value={bookFormData.book_name} onChange={handleChangebook} className='form-control mt-3' placeholder='Kitab Adı' />
                <input type="text" name='book_author' required value={bookFormData.book_author} onChange={handleChangebook} className='form-control mt-3' placeholder='Müəllif Adı' />
                <textarea type="text" name='book_summary' required value={bookFormData.book_summary} onChange={handleChangebook} className='form-control mt-3' placeholder='Kitabın Xülasəsi' />
                {bookFormData.have_sale ? (<input type="text" name='old_price' required value={bookFormData.old_price} onChange={handleChangebook} className='form-control mt-3' placeholder='Endirimdən Öncəki Qiymət' />) : (null)}
                <input type="text" name='price' required value={bookFormData.price} onChange={handleChangebook} className='form-control mt-3' placeholder='Kitabın Qiyməti' />
                <div className="w-100 mt-3 ms-2">
                    <div className='d-flex '><input type="checkbox" name='have_sale' className="form-check" id="have_sale" checked={bookFormData.have_sale} onChange={handleChangebook} autoComplete='off' placeholder='' /><label htmlFor='have_sale' className='mb-0 ms-2 text-secondary'>Kitab Endirimdədir</label></div>
                </div>
                <select className='form-control text-secondary mt-3' id='book_category' name='book_category' value={bookFormData.book_category} onChange={handleChangebook}>
                    <option value="" >Kitabın Kategoriyasını Seç</option>
                    {categorydata == null ? (null) : (
                        categorydata.map((category, categorykey) => {
                            return (<option value={category.category_name} key={categorykey}>{category.category_name}</option>)
                        })
                    )}
                </select>
                {bookFormData.book_image_url =="" ? (<input type="file" name="book_image_url" id="book_image_url" className='form-control mt-3' onChange={handleImgUpload}/>):(null)}
                {bookFormData.book_image_url == "" ? (null):(
                    <div className='image mt-3 shadow-sm border'>
                        <div className="image-container">
                            <img src={bookFormData.book_image_url} alt="" />
                        </div>
                        <Link to={bookFormData.book_image_url} target='_blank' className='link'>{bookFormData.book_image_url}</Link>
                        <div className="del-img border shadow-sm" onClick={()=>{setBookFormData({...bookFormData, book_image_url:""})}}>
                            <img src="icon/delete.svg" alt="" />
                        </div>
                    
                    </div>
                )}
                <button className='btn btn-primary mt-3 mb-2 w-50' type='submit'>Kitab Əlavə Et</button>
            </form>
        </div>
    )
}

export default Admin