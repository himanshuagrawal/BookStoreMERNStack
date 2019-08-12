import React from 'react';
import {withRouter} from 'react-router-dom';
import '../../assets/CSS/BookSearch.css';
import CategoriesOptions from '../SelectOptions/CategoriesOptions';
import BookSearchResult from './BookSearchResult';
import $ from 'jquery';

class BookSearch extends React.Component{
    constructor(){
        super();
        this.state={
            books:[],
            bookSearchList:[]
        }
        this.count=0;
    }
    getBooks=()=> {
        this.count=0;
        let bookAuthor = document.querySelector('#bookSearchAuthor').value;
        let bookTitle = document.querySelector('#bookSearchTitle').value;
        let isbn = document.querySelector('#bookSearchIsbn').value;
        let category = document.querySelector('#bookSearchCategory').value;
        fetch(`/bookapi/getsearchedbooks?author=${bookAuthor}&title=${bookTitle}&isbn=${isbn}&category=${category}`)
            .then( (response)=> {
                return response.json();
            }).then( (data)=> {
                this.setState({
                    books: Array.from(data),
                    bookSearchList: Array.from(data).slice(0, 30)
                })
            })
            this.count++;
    }

    addingEventListener=()=>{
        window.addEventListener('scroll', () => {
            let key = $(window).scrollTop() + $(window).height();
            let dockey = $(document).height();
            let y = dockey - key;
            if (y <= 250) {
                let newBookAdded = [...this.state.bookSearchList, ...this.state.books.slice(this.count * 30, this.count * 30 + 30)];
                this.count++;
                this.setState({
                    bookSearchList: newBookAdded
                })
            }
        });
    }

    componentDidMount=()=>{
        fetch('/bookapi/getallbooks').then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                books: Array.from(data),
                bookSearchList: Array.from(data).slice(0, 30)
            })
            this.count++;
        })
    }

    componentWillUnmount=()=>{
        window.removeEventListener('scroll',this.addingEventListener);
    }

    openLoginModal=(e)=>{
        e.preventDefault();
        window.$('#loginModal').modal('show');
    }

    openCartModal=(e)=>{
        e.preventDefault();
        window.$('#cartModal').modal('show');
    }
    render(){
        let cartIconFunction = this.props.authStatus?this.openCartModal:this.openLoginModal;
    return (
        <div className="col-xl-9 book-search-result">
            <h2 className="book-search-heading" id="bookSearchHeading">Search Books</h2>
            <div className="book-search-row-first">
                <div className="book-search-title">
                    <h5 className="book-search-booktitle-title">Book Title</h5>
                    <input type="text" className="book-search-title-input" id="bookSearchTitle" onKeyUp={this.getBooks} />
                </div>
                <div className="book-search-author">
                    <h5 className="book-search-author-title">Book Author</h5>
                    <input type="text" className="book-search-author-input" id="bookSearchAuthor" onKeyUp={this.getBooks}/>
                </div>
            </div>
            <div className="book-search-row-second">
                <div className="book-search-isbn">
                    <h5 className="book-search-isbn-title">ISBN</h5>
                    <input type="text" className="book-search-isbn-input" id="bookSearchIsbn" onKeyUp={this.getBooks}/>
                </div>
                <div className="book-search-category">
                    <h5 className="book-search-category-title">Book Category</h5>
                    <CategoriesOptions fun={this.getBooks} />
                </div>
            </div>
            <BookSearchResult searchResult={this.state.bookSearchList} cartIconFunction={cartIconFunction} />
        </div>
    )
}
}
export default withRouter(BookSearch);
