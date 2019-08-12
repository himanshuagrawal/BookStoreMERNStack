import React from 'react';
import '../../assets/CSS/GuestHeader.css';
import image from '../../assets/images/BookStoreImage.jpg';
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';

class GuestHeader extends React.Component {
    openLoginModal = (e) => {
        e.preventDefault();
        window.$('#loginModal').modal('show');
        $('#registrationSuccessful').css('display', 'none');
        $('#loginFailed').css('display', 'none');
        $('#loginModalUsername').val("");
        $('#loginModalPassword').val("");
    }
    logOut = () => {
        fetch('/userapi/logout')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.props.updateState(data);
            })
    }
    render() {
        const { changeBookCategory,authStatus } = this.props;
        let name;
        try {
            name = this.props.userData.userDetails.fullName.split(' ')[0];
        } catch (e) { }
        if (authStatus) {
            return (
                <header className="container container-header">
                    <div className="row">
                        <div className="col-xl-3">
                            <div className="book-store-image-container">
                                <Link to="/bookstore/home" onClick={() => {
                                    changeBookCategory('Top Rated');
                                }}><img src={image} className="book-store-image" alt="BookStore"></img></Link>
                            </div>
                        </div>
                        <div className="col-xl-9">
                            <nav className="nav-items-container">
                                <h5 className="welcome-title" id="welcomeTitle">Welcome {name}<span className="welcome-title-username"
                                    id="welcomeTitleUsername"></span><i className="fas fa-shopping-cart cart-icon" onClick={() => {
                                        window.$('#cartModal').modal('show');
                                    }}><span
                                        className="cart-count">{this.props.userData.cartCount}</span></i></h5>
                                <ul className="nav-items">
                                    <li className="nav-item"><NavLink className="nav-links" to="/bookstore/home" onClick={this.logOut}>LOGOUT</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-links" to="/bookstore/wishlist">WISHLIST</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-links" to="/bookstore/account">ACCOUNT</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-links" to="/bookstore/booksearch">SEARCH</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-links" to="/bookstore/home" onClick={() => {
                                        changeBookCategory('Top Rated');
                                    }}>HOME</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
            )
        } else {
            return (
                <header className="container container-header">
                    <div className="row">
                        <div className="col-xl-3">
                            <div className="book-store-image-container">
                                <Link to="/bookstore/home" onClick={() => {
                                    changeBookCategory('Top Rated');
                                }}><img src={image} className="book-store-image" alt="BookStore"></img></Link>
                            </div>
                        </div>
                        <div className="col-xl-9">
                            <nav className="nav-items-container">
                                <h5 className="welcome-title" id="welcomeTitle">Welcome <span className="welcome-title-username"
                                    id="welcomeTitleUsername">Guest</span></h5>
                                <ul className="nav-items">
                                    <li className="nav-item"><NavLink className="nav-links loginModal" to="" onClick={this.openLoginModal}>LOGIN</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-links" to="/bookstore/booksearch">SEARCH</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-links" to="/bookstore/home" onClick={() => {
                                        changeBookCategory('Top Rated');
                                    }}>HOME</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
            )
        }
    }
}



export default GuestHeader;