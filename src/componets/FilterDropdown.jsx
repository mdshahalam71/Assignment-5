import React from 'react';

const FilterDropdown = ({ onFilterChange, currentFilter }) => {
  const handleChange = (e) => {
    const newFilter = e.target.value;
    onFilterChange(newFilter);
  };

  return (
    <div>
      <select value={currentFilter} onChange={handleChange}>
        <option value="default">Default</option>
        <option value="fastName-asc">First Name (A → Z)</option>
        <option value="lastname-asc">Last Name (A → Z)</option>
        <option value="oldest">Oldest To First</option>
      </select>
    </div>
  );
};

export default FilterDropdown;