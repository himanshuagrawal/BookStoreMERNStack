import React from 'react';
import '../../assets/CSS/Modals/BookReviewModal.css';


function BookReviewModal() {
    return (
        <div className="modal fade" id="reviewModal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <h2 className="review-modal-heading" id="reviewModalHeading">Write a Review</h2>
                    <div className="row">
                        <div className="col-xl-3 review-modal-book-details">
                            <img src="<%=obj.thumbnailUrl%>" class="book-details-img" alt="<%=obj.title%>"></img>
                        </div>
                        <div class="col-xl-9 review-modal-rating-inputs">
                            <h5 class="review-modal-comment-title" id="modalCommentTitle">Your Comment</h5>
                            <textarea class="review-modal-rating-comment" id="modalCommentInput"></textarea>
                            <p class="empty-comment">Please Enter a comment!</p>
                            <p class="valid-comment">Comment Added Successfully</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-3 review-modal-book-details">
                            <h5 class="review-modal-book-title" id="modalBookTitle"><%=obj.title%></h5>
                            <h5 class="review-modal-book-author" id="modalBookAuthor"><%=obj.authors%></h5>
                        </div>
                        <div class="col-xl-9 review-modal-rating-inputs">
                            <h5 class="review-modal-rating-title" id="modalRatingTitle">Your Rating</h5>
                            <fieldset class="rating">
                                <input type="radio" id="star5" name="rating" value="5" /><label for="star5"
                                    title="Rocks!">5 stars</label>
                                <input type="radio" id="star4" name="rating" value="4" /><label for="star4"
                                    title="Pretty good">4 stars</label>
                                <input type="radio" id="star3" name="rating" value="3" /><label for="star3"
                                    title="Meh">3 stars</label>
                                <input type="radio" id="star2" name="rating" value="2" /><label for="star2"
                                    title="Kinda bad">2 stars</label>
                                <input type="radio" id="star1" name="rating" value="1" /><label for="star1"
                                    title="Sucks big time">1 star</label>
                            </fieldset>
                            <div class="close-options">
                                <button class="btn btn-primary close-options-button" id="closeOptionsButton">Post
                                    Comment</button>
                                <span class="close-options-link" id="closeOptionsLink">Cancel Post</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}