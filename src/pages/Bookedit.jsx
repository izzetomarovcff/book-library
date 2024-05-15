import React, { useEffect, useState } from 'react'

function Bookedit() {
  const [bookdata, setBookData] = useState(null)
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
  const delBook = (id)=>{
    fetch('http://localhost:3001/delbook', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload()
                
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
  }
  return (
    <div className='bookedit'>
      <div className='buttons mt-2 mb-4'>
        <button className='btn btn-primary'>Əlavə Et</button>
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
                  <td className='record5'><button className='btn btn-danger btn-sm m-3' onClick={() => delBook(book.id)}>Sil</button><button className='btn btn-primary btn-sm m-3'>Dəyiş</button></td>
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