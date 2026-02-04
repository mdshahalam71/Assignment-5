import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, currentSearchTerm }) => {
    const [inputValue, setInputValue] = useState(currentSearchTerm || '');

    useEffect(() => {
        (currentSearchTerm || '');
    }, [currentSearchTerm]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(inputValue);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div class="input-group w-50">
            <input
                class="form-control"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="search contact"
            />
            <button onClick={handleSearchClick}  class="btn btn-success" id="button-addon2">Search</button>
        </div>
    );
};

export default SearchBar;