import React from 'react';
import {Link} from 'react-router-dom';

function BookSearchResult({searchResult,cartIconFunction}) {
    let htmlList = searchResult.map((item) => {
        let toString = `/bookstore/bookpdp?_id=${item._id}`;
        return (<Link className="card-wrapper" id="bookWrapper" to={toString} _id={item._id} key={item._id}>
            <div className="card" id="book" >
                <img className="card-img-top" id="bookImg" src={item.thumbnailUrl} alt={item.title}></img>
                <div className="card-body" id="bookBody">
                    <h5 className="card-title" id="bookTitle">{item.title}</h5>
                    <h5 className="card-title card-author" id="bookAuthor">{item.authors[0]}</h5>
                    <div className="book-rating" id="bookCommentRating">
                        <div className="stars-outer">
                            <div className="stars-inner commentRating" style={{ 'width': item.rating * 20 + '%' }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="book-price-cart" onClick={cartIconFunction}>
                    <h2 className="book-price-tag">${item.buyPrice}</h2>
                    <i className="fas fa-shopping-cart book-cart-btn" ></i>
                </div>
            </div>
        </Link>)
    })
    return (
        <div className="book-search-result">
            <div className="book-container" id="bookContainer">
                {htmlList}
            </div>
        </div>
    )
}

export default BookSearchResult;