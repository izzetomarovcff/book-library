import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
    return (
        <div className="card shadow">
            <Link to={"/books/details"} className="img">
                <img src={props.data.book_image_url} alt="" />
                <div className="category btn btn-sm btn-primary">{props.data.book_category}</div>
            </Link>
            <div className='info'>
                <Link to={"/books/details"} className='book-name'>{props.data.book_name}</Link>
                <p className="book-author">{props.data.book_author}</p>
                <p className="book-summary">{props.data.book_summary}</p>
            </div>
            <div className="prices">
                {props.data.have_sale ? (<del className='old-price'>{props.data.old_price}$</del>):(null)}
                <p className='new-price'>{props.data.price}$</p>
            </div>
            <div className='events'>
                <button className='btn btn-outline-primary'>Səbətə Əlavə Et</button>
                <div className="favorite">
                    <img src="icon/heart.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Card