import React from 'react';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import BookPdpDetails from './BookPdpNestedCoponents/BookPdpDetails';
import BookPdpBookDescription from './BookPdpNestedCoponents/BookPdpBookDescription';
import BookPdpComments from './BookPdpNestedCoponents/BookPdpComments';
import '../../assets/CSS/BookPdp.css'


class BookPdp extends React.Component {
    constructor() {
        super();
        this.state = {
            bookDetails: {},
            comments: [],
            commentCount:0
        }
    }
    navigateToComment=()=>{
        window.location.href="#bookCommentsHeading";
    }
    componentDidMount = () => {
        fetch(`/bookapi/getbook/${queryString.parse(this.props.location.search)._id}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.setState({
                    bookDetails: data
                })
            });
        fetch(`/bookapi/getbook/${queryString.parse(this.props.location.search)._id}/getallcomments`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                let comments = Array.from(data).reverse();
                this.setState({
                    comments: comments,
                    commentCount:comments.length
                })
            });
    }
    render() {
        return (
            <div className="col-xl-9 book-pdp" _id={queryString.parse(this.props.location.search)._id} id="parent">
                <BookPdpDetails bookDetails={this.state.bookDetails} navigateToCommentFunction= {this.navigateToComment} authStatus={this.props.authStatus}/>
                <BookPdpBookDescription book={this.state.bookDetails} />
                <BookPdpComments comments={this.state.comments} commentCount={this.state.commentCount} />
            </div>
        )
    }
}

export default withRouter(BookPdp);