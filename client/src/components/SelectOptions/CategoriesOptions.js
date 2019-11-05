import React from 'react';

function CategoryOptions(props) {
    return (
        <select className="book-search-category-input" id="bookSearchCategory" onChange={props.fun}>
            <option value="" defaultValue>Select Category</option>
            <option value="Java">Java</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Internet">Internet</option>
            <option value="Web Development">Web Development</option>
            <option value="Microsoft .NET-34">Microsoft .NET-34</option>
            <option value="Programming">Programming</option>
            <option value="Client-Server">Client-Server</option>
            <option value="Business">Business</option>
            <option value="Computer Graphics">Computer Graphics</option>
            <option value="PowerBuilder">PowerBuilder</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Python">Python</option>
            <option value="Object-Oriented Programming">Object-Oriented Programming</option>
            <option value="Networking">Networking</option>
            <option value="Theory">Theory</option>
            <option value="Perl">Perl</option>
            <option value="Mobile Technology">Mobile Technology</option>
            <option value="XML">XML</option>
        </select>
    )
}

export default CategoryOptions;