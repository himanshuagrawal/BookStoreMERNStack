import React from 'react';
import ReactDOM from 'react-dom';
import '../../assets/CSS/Modals/CartModal.css';
import { withRouter } from 'react-router-dom';
import CartModalOrders from '../Modals/CatModalOrders';

class CartModal extends React.Component {

    removeBookFromCart = (event) => {
        let itemId = event.target.parentNode.parentNode.getAttribute('_id');
        let bookId = event.target.parentNode.parentNode.getAttribute('bookid');
        let userId = this.props.state.userDetails._id;
        fetch(`/userapi/removebookfromcart?userId=${userId}&cartItemId=${itemId}`)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
            });
        // let userCart = this.props.state.userDetails.cart;
        // let index = userCart.findIndex((item) => {
        //     return item._id === itemId;
        // })
        // userCart.splice(index, 1);
        // let newUserDetails = this.props.state.userDetails;
        // newUserDetails.cart = userCart;
        // this.props.updateState("userDetails",newUserDetails);
        // // this.setState({
        // //     userDetails: newUserDetails
        // // })
    }

    closeModal = () => {
        window.$('#cartModal').modal('hide');
    }
    
    increaseBookQty = (event) => {
        let oneBookPrice = parseInt(event.target.parentNode.nextElementSibling.innerText.split(' ')[1]);
        let totalBookPrice = parseInt(event.target.parentNode.nextElementSibling.nextElementSibling.innerText.split(' ')[1]);
        let originalValue = totalBookPrice / oneBookPrice;
        let cartItemId = event.target.parentNode.parentNode.getAttribute('_id');
        let userId = document.cookie.split('=')[1];
        let newValue = event.target.value;

        if (event.target.value <= 3 && event.target.value >= 1) {
            fetch(`/userapi/updatecart?userId=${userId}&cartItemId=${cartItemId}&updatedCount=${event.target.value}`)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    let total = newValue > originalValue ? this.props.state.totalAmount + oneBookPrice : this.props.state.totalAmount - oneBookPrice;
                    let currentCount = newValue > originalValue ? this.props.state.cartCount + 1 : this.props.state.cartCount - 1;
                    this.props.updateState("userDetails", data);
                    this.props.updateState("totalAmount", total);
                    this.props.updateState("cartCount", currentCount);
                });
        }
    }

    handleRedirectClick = () => {
        window.$('#cartModal').modal('hide');
        this.props.history.push('shippingaddress');
    }

    render() {
        return ReactDOM.createPortal(
            <div className="modal fade" id="cartModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <h2 className="cart-modal-heading" id="reviewModalHeading">Your Cart</h2>
                        <div className="container">
                            <div className="book-items-headings on-items" >
                                <div className="row book-items-heading-row">
                                    <div className="col-sm-5 book-items-heading-container">
                                        <h2 className="book-items-heading">ITEM(S)</h2>
                                    </div>
                                    <div className="col-sm-1 book-items-heading-container">
                                        <h2 className="book-items-heading">QTY</h2>
                                    </div>
                                    <div className="col-sm-2 book-items-heading-container center-align">
                                        <h2 className="book-items-heading">PRICE</h2>
                                    </div>
                                    <div className="col-sm-2 book-items-heading-container center-align">
                                        <h2 className="book-items-heading">SUB TOTAL</h2>
                                    </div>
                                </div>
                            </div>
                            <h2 className="no-book-cart no-items" style={{ 'display': 'none' }}>Your Cart is Empty !</h2>
                            <CartModalOrders state={this.props.state} removeBookFromCart={this.removeBookFromCart} increaseBookQty={this.increaseBookQty} />
                            <div className="total-amount on-items">
                                <div className="row total-amount-row">
                                    <div className="offset-sm-4 col-sm-4 cart-total-amount-title-container">
                                        <h2 className="cart-total-amount-title">Total Amount Payable :</h2>
                                    </div>
                                    <div className="col-sm-2 cart-total-amount-container center-align" id="totalAmount">
                                        <h2 className="cart-total-amount">$ {this.props.state.totalAmount}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="button-className">
                                <div className="row">
                                    <div className="col-sm-5 btn-container">
                                        <button className="btn btn-primary continue-shopping-button" onClick={this.closeModal}>Close and continue shopping</button>
                                    </div>
                                    <div className="col-sm-3 offset-sm-4 btn-container-checkout on-items">
                                        <button className="btn btn-primary checkout-button" onClick={this.handleRedirectClick}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>, document.getElementById('modals')
        )
    }
}

export default withRouter(CartModal);

