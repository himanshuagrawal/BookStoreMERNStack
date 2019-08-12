import React from 'react';

function CartModalOrders(props){
        let htmlList;
        let { userDetails, booksInCart } = props.state;
        try {
             htmlList = userDetails.cart.map((itemCart) => {
                let book = booksInCart.find((item) => { return itemCart.bookId === item._id })
                //console.log(itemCart,book);
                return (
                    <div className="row book-container-items-row" _id={itemCart._id} bookid={itemCart.bookId} key={itemCart._id}>
                        <div className="col-sm-1 book-container-items book-container-items-img">
                            <img className="cart-book-img" alt={book.title} src={book.thumbnailUrl}></img>
                        </div>
                        <div className="col-sm-4 book-container-items book-container-items-title">
                            <h2 className="cart-book-title">{book.title}</h2>
                        </div>
                        <div className="col-sm-1 book-container-items book-container-items-qty">
                            <input className="cart-book-qty" max="3" min="1" type="Number" value={itemCart.numberOfBooks} onChange={props.increaseBookQty}></input>
                        </div>
                        <div className="col-sm-2 book-container-items book-container-items-price center-align">
                            <h2 className="cart-book-price">$ {book.buyPrice}</h2>
                        </div>
                        <div className="col-sm-2 book-container-items book-container-items-total center-align">
                            <h2 className="cart-book-total">$ {book.buyPrice*itemCart.numberOfBooks}</h2>
                        </div>
                        <div>
                            <button className="btn btn-danger cart-book-remove-button" onClick={props.removeBookFromCart}>Remove</button>
                        </div>
                    </div>
                )
            })
        } catch (e) { }
        return (
            <div className="book-container">
            {htmlList}
            </div>
        )
}

export default CartModalOrders;