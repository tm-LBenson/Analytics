import React from 'react';

const Sidebar = ({ items, onItemClick }) => (
  <div className="sidebar">
    <h3 className="sidebar__logo">Sites</h3>
    <ul className="sidebar__list">
      {items.map((item, index) => (
        <li
          className="sidebar__list-item"
          key={index}
        >
          <button
            className="sidebar__list-item-button"
            onClick={() => onItemClick(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
