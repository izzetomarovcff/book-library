import React from 'react'

function Card(props) {
    const toCart = () => {
        console.log("toCart")
    }
    const toFav = () => {
        console.log("tofav")
    }
    return (
        <div className='card shadow'>
            <div className="img">
                <div className="category btn ">
                    Roman
                </div>
                <img src="img/1.jpg" alt="" />
            </div>
            <div className="info">
                <p className='book'>{props.data.bookname}</p>
                <p className='author'>{props.data.author}</p>
                <p className='summary'>{props.data.summary}</p>
                <div className='price-details'>
                    <del>{props.data.oldprice}$</del>
                    <p>{props.data.price}$</p>
                </div>
                <div className="actions">
                    <button type='button' className='btn btn-outline-primary shadow-sm' onClick={() => { toCart() }}>Add To Cart</button>
                    <div className="favorite border border-primary shadow-sm" onClick={() => { toFav() }}>
                        <img src="icons/heart.svg" alt="heart" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card