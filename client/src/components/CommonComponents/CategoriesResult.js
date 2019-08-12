import React from 'react';
import '../../assets/CSS/Categoriesresult.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class CategoriesResult extends React.Component {
    constructor() {
        super();
        this.state = {
            booksToDisplay: [],
            books: [],
            category: ""
        }
        this.count = 0;
    }

    fetchTopRated = () => {
        fetch('/bookapi/getallbooks').then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                books: Array.from(data),
                category: this.props.category,
                booksToDisplay: Array.from(data).slice(0, 30)
            })
            this.count++;
        })
        document.querySelectorAll('#bookWrapper').forEach(function (item) {
            $(item).animate({
                opacity: "show"
            }, 1000)
        });
        window.addEventListener('scroll', this.addingScrollListener);
    }

    fetchCategoryBooks = (category) => {
        fetch(`/bookapi/getbooks?category=${this.props.category}`).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                books: Array.from(data),
                category: this.props.category,
                booksToDisplay: Array.from(data).slice(0, 30)
            })
            this.count++;
        })
    }

    componentDidMount = () => {
        this.fetchTopRated();
    }

    componentDidUpdate = () => {
        if (this.props.category !== this.state.category) {
            this.count = 0;
            if (this.props.category !== 'Top Rated') {
                this.fetchCategoryBooks(this.props.category);
            } else {
                this.fetchTopRated();
            }
        }
        document.querySelectorAll('#bookWrapper').forEach(function (item) {
            $(item).animate({
                opacity: "show"
            }, 1000)
        })
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.addingScrollListener);
    }

    addingScrollListener = () => {
        let key = $(window).scrollTop() + $(window).height();
        let dockey = $(document).height();
        let y = dockey - key;
        if (y <= 250) {
            let newBookAdded = [...this.state.booksToDisplay, ...this.state.books.slice(this.count * 30, this.count * 30 + 30)];
            this.count++;
            this.setState({
                booksToDisplay: newBookAdded
            })
        }
    }
    
    openLoginModal=(e)=>{
        e.preventDefault();
        window.$('#loginModal').modal('show');
    }

    openCartModal=(e)=>{
        e.preventDefault();
        var obj = {
            bookId: e.target.parentNode.parentNode.parentNode.getAttribute('_id'),
            typeOfBook: "Purchase"
        };
        fetch(`/userapi/addbooktocart?userId=${this.props.userData._id}`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': "Application/json"
            }
        }).then((response)=> {
            return response.json();
        }).then((data)=> {
            if(data.hasOwnProperty('result')){
                alert("Already exceed the purchase limit for this item...!");
            }else{
                this.props.updateUserDetails(data,obj.bookId);
                window.$('#cartModal').modal('show');
            }
        });
    }

    render() {
        let cartIconFunction = this.props.authStatus?this.openCartModal:this.openLoginModal;
        let htmlList = this.state.booksToDisplay.map((item) => {
            let toString = `/bookstore/bookpdp?_id=${item._id}`;
            return (<Link className="card-wrapper" id="bookWrapper" to={toString} _id={item._id} key={item._id} style={{ 'display': 'none' }}>
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
                    <div className="book-price-cart">
                        <h2 className="book-price-tag">${item.buyPrice}</h2>
                        <i className="fas fa-shopping-cart book-cart-btn" onClick={cartIconFunction}></i>
                    </div>
                </div>
            </Link>)
        })
        return (
            <div className="col-xl-9 book-result">
                <h2 className="book-result-heading" id="bookResultHeading">{this.state.category}</h2>
                <div className="book-container" id="bookContainer">
                    {htmlList}
                </div>
            </div>
        )
    }
}

export default CategoriesResult;