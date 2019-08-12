import React from 'react';

function BookPdpBookDescription({book}){
    return(
        <div className="book-description">
            <h2 className="book-description-heading" id="bookDescriptionHeading">Description</h2>
            <h5 className="book-description-content" id="bookDescriptionContent">{book.longDescription}</h5>
        </div>
    )
}

export default BookPdpBookDescription;