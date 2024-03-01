import React, { useState } from 'react';
import "./searchbar.css"

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Call onSearch prop with the updated search term
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
