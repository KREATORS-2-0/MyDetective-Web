import React from 'react';
import '../css/unorderd_list.css';

const UnorderedList = () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div className = "list-container">
      <h2>My Unordered List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default UnorderedList;