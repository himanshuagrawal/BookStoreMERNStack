import React from 'react';
import {NavLink} from 'react-router-dom';
import '../../assets/CSS/Categories.css'

function Categories(props){
    const {changeBookCategory}=props;
    return(
        <div className="col-xl-3 book-categories">
        <h2 className="book-categories-heading">Book Categories</h2>
        <div className="book-categories-list">
            <NavLink className="book-categories-list-items" to="/bookstore/home#Java" onClick={()=>{
                changeBookCategory('Java');
            }} >Java</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Software Engineering" onClick={()=>{
                changeBookCategory('Software Engineering');
            }}>Software Engineering</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Internet" onClick={()=>{
                changeBookCategory('Internet');
            }}>Internet</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Web Development" onClick={()=>{
                changeBookCategory('Web Development');
            }}>Web Development</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Microsoft .NET" onClick={()=>{
                changeBookCategory('Microsoft .NET');
            }}>Microsoft .NET</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Programming" onClick={()=>{
                changeBookCategory('Programming');
            }}>Programming</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Client-Server" onClick={()=>{
                changeBookCategory('Client-Server');
            }}>Client-Server</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Business" onClick={()=>{
                changeBookCategory('Business');
            }}>Business</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Computer Graphics" onClick={(e)=>{
                changeBookCategory('Computer Graphics');
            }}>Computer Graphics</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#PowerBuilder" onClick={()=>{
                changeBookCategory('PowerBuilder');
            }}>PowerBuilder</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Microsoft" onClick={()=>{
                changeBookCategory('Microsoft');
            }}>Microsoft</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Python" onClick={()=>{
                changeBookCategory('Python');
            }}>Python</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Object-Oriented Programming" onClick={()=>{
                changeBookCategory('Object-Oriented Programming');
            }}>Object-Oriented Programming</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Networking" onClick={()=>{
                changeBookCategory('Networking');
            }}>Networking</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Theory" onClick={()=>{
                changeBookCategory('Theory');
            }}>Theory</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Perl" onClick={()=>{
                changeBookCategory('Perl');
            }}>Perl</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#Mobile Technology" onClick={()=>{
                changeBookCategory('Mobile Technology');
            }}>Mobile Technology</NavLink>
            <NavLink className="book-categories-list-items" to="/bookstore/home#XML" onClick={()=>{
                changeBookCategory('XML');
            }}>XML</NavLink>
        </div>
    </div>
    )
}

export default Categories;