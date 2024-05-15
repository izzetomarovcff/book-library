import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { imageDb } from '../firebase'
import { v4 } from 'uuid'

function Bookedit() {
  const [bookdata, setBookData] = useState(null)
  const [activeEdit, setActiveEdit] = useState(false)
  const [activeNew, setActiveNew] = useState(false)
  const [categorydata, setCategoryData] = useState(null)
  const [book, setBook] = useState({
    id: 0,
    book_image_url: "",
    book_category: "",
    book_name: "",
    book_author: "",
    book_summary: "",
    have_sale: false,
    old_price: 0,
    price: 0
  })
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
        setBookData(data)
      })
  }, [])
  const delBook = (id) => {
    fetch('http://localhost:3001/delbook', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
      .then(response => response.json())
      .then(data => {
        fetch("http://localhost:3001/getbooks")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setBookData(data)
      })

      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  }
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
  const startEdit = (book) => {
    setActiveEdit(true)
    setBook(prevState => ({
      ...prevState,
      id: Number(book.id),
      book_category: book.book_category,
      book_image_url: book.book_image_url,
      book_name: book.book_name,
      book_author: book.book_author,
      book_summary: book.book_summary,
      have_sale: (book.have_sale == 1 ? (true) : (false)),
      old_price: (book.old_price == 0 ? ("") : (book.old_price)),
      price: book.price
    }))
  }
  const handleImgUpload = async (e) => {
    const selectedFile = e.target.files[0]
    requestDataBase(selectedFile)
  }
  const requestDataBase = async (selFile) => {
    const imgRef = ref(imageDb, `product/${v4()}`)
    try {
      await uploadBytes(imgRef, selFile)
      const downloadURL = await getDownloadURL(imgRef)
      setBook(prevState => ({
        ...prevState,
        book_image_url: downloadURL
      }))

    } catch (error) {
      console.log(error)
    }
  }
  const handleChangebook = (e) => {
    const { name, value, checked } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: (name === "old_price" || name === "price" ? (Number(value)) : (name === "have_sale" ? (checked) : (value)))
    }))
    console.log(book)
  }
  const handleSubmitBook = (e) => {
    e.preventDefault()
    if (activeEdit) {
      const lastData = { ...book, have_sale: (book.have_sale ? (1) : (0)), old_price: (book.old_price == "" ? (0) : (book.old_price)) }
      fetch('http://localhost:3001/editbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lastData)
      })
        .then(response => response.json())
        .then(data => {
          setActiveEdit(false)
          fetch("http://localhost:3001/getbooks")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setBookData(data)
      })
        })
        .catch(error => {
          console.error('Error adding book:', error);
        });
    }else if(activeNew){
      const lastData = { ...book, have_sale: (book.have_sale ? (1) : (0)), old_price: (book.old_price == "" ? (0) : (book.old_price)) }
      fetch('http://localhost:3001/newbook', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(lastData)
      })
          .then(response => response.json())
          .then(data => {
            setActiveNew(false)
            fetch("http://localhost:3001/getbooks")
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log(data)
              setBookData(data)
            })
          })
          .catch(error => {
              console.error('Error adding book:', error);
          });
    }

  }
  const startNew = () =>{
    setActiveNew(true)
    setBook(prevState => ({
      ...prevState,
      id: 0,
      book_category: "",
      book_image_url: "",
      book_name: "",
      book_author: "",
      book_summary: "",
      have_sale: false,
      old_price: "",
      price: ""
    }))
  }
  return (
    <div className='bookedit'>
      {activeEdit ? (
        <div className="bookmodal">
          <div className="bookform shadow">
            <div className="closemodal" onClick={() => { setActiveEdit(false) }}>
              <img src="icon/delete.svg" alt="" />
            </div>
            <form className='form-control form' onSubmit={handleSubmitBook}>
              <input onChange={handleChangebook} type="text" value={book.book_name} className='form-control mt-3' name="book_name" id="book_name" required />
              <input onChange={handleChangebook} type="text" value={book.book_author} className='form-control mt-3' name="book_author" id="book_author" required />
              <textarea onChange={handleChangebook} type="text" value={book.book_summary} className='form-control mt-3' name="book_summary" id="book_summary" required />
              {book.have_sale ? (<input type="text" onChange={handleChangebook} value={book.old_price} className='form-control mt-3' name="old_price" id="old_price" required />) : (null)}

              <input type="text" onChange={handleChangebook} value={book.price} className='form-control mt-3' name="price" id="price" required />
              <div className="w-100 mt-3 ms-2">
                <div className='d-flex '><input type="checkbox" name='have_sale' className="form-check" id="have_sale" checked={book.have_sale} onChange={handleChangebook} autoComplete='off' placeholder='' /><label htmlFor='have_sale' className='mb-0 ms-2 text-secondary'>Kitab Endirimdədir</label></div>
              </div>
              <select name="book_category" onChange={handleChangebook} className='form-control text-secondary mt-3' value={book.book_category} id="book_category" required>
                <option value="" >Kitabın Kategoriyasını Seç</option>
                {categorydata == null ? (null) : (
                  categorydata.map((category, categorykey) => {
                    return (<option value={category.category_name} key={categorykey}>{category.category_name}</option>)
                  })
                )}
              </select>
              {book.book_image_url == "" ? (<input type="file" name="book_image_url" id="book_image_url" onChange={handleImgUpload} className='form-control mt-3' required />) : (null)}
              {book.book_image_url == "" ? (null) : (
                <div className='imagediv mt-3 border shadow-sm'>
                  <div className="del-img shadow-sm border" onClick={() => { setBook({ ...book, book_image_url: "" }) }}>
                    <img src="icon/delete.svg" alt="" />
                  </div>
                  <div className='img'>
                    <img src={book.book_image_url} alt="" />
                  </div>
                  <div className='info'><Link to={book.book_image_url} target='_blank'>{book.book_image_url}</Link></div>
                </div>
              )}
              <button type='submit' className='btn btn-primary mt-3'>Düzəliş Et</button>
            </form>
          </div>
        </div>
      ) : (null)}
      {activeNew?(
        <div className="bookmodal">
        <div className="bookform shadow">
          <div className="closemodal" onClick={() => { setActiveNew(false) }}>
            <img src="icon/delete.svg" alt="" />
          </div>
          <form className='form-control form' onSubmit={handleSubmitBook}>
            <input onChange={handleChangebook} type="text" value={book.book_name} className='form-control mt-3' name="book_name" id="book_name" required />
            <input onChange={handleChangebook} type="text" value={book.book_author} className='form-control mt-3' name="book_author" id="book_author" required />
            <textarea onChange={handleChangebook} type="text" value={book.book_summary} className='form-control mt-3' name="book_summary" id="book_summary" required />
            {book.have_sale ? (<input type="text" onChange={handleChangebook} value={book.old_price} className='form-control mt-3' name="old_price" id="old_price" required />) : (null)}

            <input type="text" onChange={handleChangebook} value={book.price} className='form-control mt-3' name="price" id="price" required />
            <div className="w-100 mt-3 ms-2">
              <div className='d-flex '><input type="checkbox" name='have_sale' className="form-check" id="have_sale" checked={book.have_sale} onChange={handleChangebook} autoComplete='off' placeholder='' /><label htmlFor='have_sale' className='mb-0 ms-2 text-secondary'>Kitab Endirimdədir</label></div>
            </div>
            <select name="book_category" onChange={handleChangebook} className='form-control text-secondary mt-3' value={book.book_category} id="book_category" required>
              <option value="" >Kitabın Kategoriyasını Seç</option>
              {categorydata == null ? (null) : (
                categorydata.map((category, categorykey) => {
                  return (<option value={category.category_name} key={categorykey}>{category.category_name}</option>)
                })
              )}
            </select>
            {book.book_image_url == "" ? (<input type="file" name="book_image_url" id="book_image_url" onChange={handleImgUpload} className='form-control mt-3' required />) : (null)}
            {book.book_image_url == "" ? (null) : (
              <div className='imagediv mt-3 border shadow-sm'>
                <div className="del-img shadow-sm border" onClick={() => { setBook({ ...book, book_image_url: "" }) }}>
                  <img src="icon/delete.svg" alt="" />
                </div>
                <div className='img'>
                  <img src={book.book_image_url} alt="" />
                </div>
                <div className='info'><Link to={book.book_image_url} target='_blank'>{book.book_image_url}</Link></div>
              </div>
            )}
            <button type='submit' className='btn btn-primary mt-3'>Əlavə Et</button>
          </form>
        </div>
      </div>
      ):(null)}

      <div className='buttons mt-2 mb-4'>
        <button className='btn btn-primary' onClick={startNew}>Əlavə Et</button>
      </div>
      <table className='shadow border'>
        <thead>
          <tr className='table100-head-book'>
            <th className='column1'>ID</th>
            <th className='column2'>Kitab Adı</th>
            <th className='column3'>Müəllif</th>
            <th className='column4'>Qiymət</th>
            <th className='column5'>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>

          {bookdata == null ? (null) : (
            bookdata.map((book, bookkey) => {
              return (
                <tr className='table100-body-book' key={bookkey} >
                  <td className='record1'>{book.id}</td>
                  <td className='record2'>{book.book_name}</td>
                  <td className='record3'>{book.book_author}</td>
                  <td className='record4'>{book.price}</td>
                  <td className='record5'><button className='btn btn-danger btn-sm m-3' onClick={() => delBook(book.id)}>Sil</button><button onClick={() => { startEdit(book) }} className='btn btn-primary btn-sm m-3'>Dəyiş</button></td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Bookedit