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
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="search contact"
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
};

export default SearchBar;