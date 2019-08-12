import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/CommonComponents/Header';
import Categories from './components/CommonComponents/Categories';
import CategoriesResult from './components/CommonComponents/CategoriesResult';
import BookSearch from './components/BookSearchPage/BookSearch';
import CartModal from './components/Modals/CartModal';
//import BookReviewModal from './components/Modals/BookReviewModal';
import BookPdp from './components/BookPDP/BookPdp';
import ShippingAddress from './components/ShippingAdress/ShippingAddressContainer';

class User extends React.Component {

  state = {
    bookCategories: "Top Rated",
    userDetails: {},
    booksInCart: [],
    totalAmount: 0,
    cartCount: 0,
    shippingAddress: {}
  }

  changeBookCategoriesState = (category) => {
    this.setState({
      bookCategories: category
    })
  }

  componentDidMount = () => {
    this.setState({
      userDetails:this.props.userDetails
    })
    let total = 0;
    let cartCount = 0;
    let booksList = [];
    this.props.userDetails.cart.forEach((item) => {
      fetch(`/bookapi/getbook/${item.bookId}`).then((response) => {
        return response.json();
      }).then((data) => {
        cartCount += item.numberOfBooks;
        total = this.state.totalAmount + data.buyPrice * item.numberOfBooks;
        booksList.push(data);
        let newList = Array.from(new Set([...this.state.booksInCart, ...booksList]));
        this.setState({
          booksInCart: newList,
          totalAmount: total,
          cartCount: cartCount
        })
      })
    })
  }

  updateUserDetails=(user,bookId)=>{
    fetch(`/bookapi/getbook/${bookId}`).then((response)=>{
      return response.json();
    }).then((book)=>{
      let newList = Array.from(new Set([...this.state.booksInCart,book]));
      this.setState((prevState)=>{
        return{
          userDetails:{...user},
          booksInCart:newList,
          totalAmount:prevState.totalAmount+book.buyPrice,
          cartCount:prevState.cartCount+1
        }
      })
    })
    this.setState({
      userDetails:{...user}
    })
  }

  removeBook=()=>{

  }

  changeBookQuantity=()=>{

  }

render() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header changeBookCategory={this.changeBookCategoriesState} userData={this.state} authStatus={this.props.authStatus} updateState={this.props.updateState} />
        <div className="container body">
          <div className="row">
            <Categories changeBookCategory={this.changeBookCategoriesState} />
            <Route exact path="/bookstore/home" render={() => { return <CategoriesResult userData={this.state.userDetails} updateUserDetails={this.updateUserDetails} category={this.state.bookCategories} authStatus={this.props.authStatus}/> }} />
            <Route exact path="/bookstore/booksearch" render={() => { return <BookSearch authStatus={this.props.authStatus}/> }} />
            <Route exact path="/bookstore/bookpdp" render={() => { return <BookPdp authStatus={this.props.authStatus}/> }} />
            <Route exact path="/bookstore/shippingaddress" render={() => { return <ShippingAddress state={this.state} updateState={this.updateState} /> }} />
          </div>
        </div>
        <CartModal state={this.state} removeBook={this.removeBook} changeBookQuantity={this.changeBookQuantity} />
      </BrowserRouter>
    </div>
  );
}
}
export default User;
