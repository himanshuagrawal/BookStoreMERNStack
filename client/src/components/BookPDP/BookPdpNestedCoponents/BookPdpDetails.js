import React from 'react';

class BookPdpDetails extends React.Component{

    openLoginModal=(e)=>{
        e.preventDefault();
        window.$('#loginModal').modal('show');
    }

    addToWishlist=(e)=>{
        e.preventDefault();
        console.log("Add to wishlist functionality api still to be implementd");
    }

    openReviewModal=(e)=>{
        console.log("Opening Review modal functionality still to be implemented....")
    }

    openCartModal=(e)=>{
        e.preventDefault();
        window.$('#cartModal').modal('show');
    }

    render(){
        const {bookDetails:book,navigateToCommentFunction,authStatus}=this.props;
        let addToWishlistFunction = authStatus?this.addToWishlist:this.openLoginModal;
        let writeAReviewFunction = authStatus?this.openReviewModal:this.openLoginModal;
        let cartIconFunction = authStatus?this.openCartModal:this.openLoginModal;
    return (
        <div className="row book-details">
            <div className="col-xl-3 book-details-img-section">
                <img src={book.thumbnailUrl} className="book-details-img" alt={book.title}></img>
            </div>
            <div className="col-xl-9 book-details-description-section">
                <h2 className="book-details-title" id="bookDetailsTitle">{book.title}</h2>
                <h5 className="book-details-author" id="bookDetailsAuthor">{book.authors}</h5>
                <div className="book-details-review" id="bookDetailsReview">
                    <div className="book-details-review-rating-stars">
                        <div className="stars-outer">
                            <div className="stars-inner bookRating" style={{ 'width': book.rating * 20 + '%' }}></div>
                        </div>
                    </div>
                    <span className="book-details-review-rating">{book.ratingCount} Ratings | </span>
                    <span className="book-details-review-comment" onClick={navigateToCommentFunction}>{book.commentCount} Reviews</span>
                </div>
                <h5 className="book-details-page-count" id="bookDetailsPageCount">Page Count : {book.pageCount}
                </h5>
                <div className="book-details-options">
                    <span className="options-symbol">+</span>
                    <span className="book-details-options-wishlist" id="addToWishlist" onClick={addToWishlistFunction}>Add to wishlist</span>
                    <span id="optionsSeparator">|</span>
                    <span className="options-symbol">@</span>
                    <span className="book-details-options-writereview" id="writeAReview" onClick={writeAReviewFunction}>Write a review</span>
                </div>
                <div className="book-price-cart-buy" onClick={cartIconFunction}>
                    <h2 className="book-price-tag">Buy for ${book.buyPrice}</h2>
                    <i className="fas fa-shopping-cart book-cart-btn" ></i>
                </div>
            </div>
        </div>
    )
    }
}


export default BookPdpDetails;