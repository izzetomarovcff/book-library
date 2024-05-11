import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddToCart, AddToFavorite, RemoveToCart, RemoveToFavorite } from '../Redux/actions'

function Card(props) {
  const dispatch = useDispatch(state=>state)
  const {GeneralResponse} = useSelector(state=>state)

    return (
        <div className="card shadow">
            <div  className="img">
                <img src={props.data.book_image_url} alt="" />
                <div className="category btn btn-sm btn-primary">{props.data.book_category}</div>
            </div>
            <div className='info'>
                <div className='book-name'>{props.data.book_name}</div>
                <p className="book-author">{props.data.book_author}</p>
                <p className="book-summary">{props.data.book_summary}</p>
            </div>
            <div className="prices">
                {props.data.have_sale ? (<del className='old-price'>{props.data.old_price}$</del>):(null)}
                <p className='new-price'>{props.data.price}$</p>
            </div>
            <div className='events'>
                {GeneralResponse.cart.find(item=>item.id == props.data.id) ? (<button className='btn btn-primary' onClick={()=>{dispatch(RemoveToCart(props.data))}}>Səbətə Əlav Edildi</button>):(<button className='btn btn-outline-primary' onClick={()=>{dispatch(AddToCart(props.data))}}>Səbətə Əlavə Et</button>)}
                {GeneralResponse.favorite.find(item=>item.id == props.data.id)? (<div className="favorited" onClick={()=>{dispatch(RemoveToFavorite(props.data))}}><img src="icon/hearted.svg" alt=""  /></div>):(<div className="favorite" onClick={()=>{dispatch(AddToFavorite(props.data))}}><img src="icon/heart.svg" alt="" /></div>)}
                
            </div>
        </div>
    )
}

export default Card