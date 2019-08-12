import React from 'react';

class BookPdpComments extends React.Component {
    componentDidUpdate = ()=>{
        if(this.props.commentCount<5){
            document.querySelector('#readAllLink').style.display='none';
        }else{
            document.querySelector('#readAllLink').style.display='inline';
        }
    }
    render() {
        const {comments}=this.props;
        let htmlList = comments.map(function (cmt) {
            return (
                <div className="book-comments-commentlist-comment" key={cmt._id}>
                    <h2 className="book-comment-username" id="bookCommentUsername">{cmt.username}</h2>
                    <div className="book-comment-rating" id="bookCommentRating">
                        <div className="stars-outer">
                            <div className="stars-inner commentRating" style={{ 'width': cmt.rating + '%' }}>
                            </div>
                        </div>
                    </div>
                    <h2 className="book-comment-date" id="bookCommentDate">{new Date(cmt.date).toDateString()}</h2>
                    <h5 className="book-comment-content" id="bookCommentContent">{cmt.comment}</h5>
                </div>
            )
        })
        return (
            <div className="book-comments">
                <h2 className="book-comments-heading" id="bookCommentsHeading">Customer Reviews</h2>
                <span className="book-comments-readall" id="readAllLink">Read All</span>
                <div className="book-comments-commentlist">
                    {htmlList}
                </div>
            </div>
        )
    }
}


export default BookPdpComments;