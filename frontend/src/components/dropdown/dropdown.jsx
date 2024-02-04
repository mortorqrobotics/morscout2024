// Dropdown.jsx
import React, { useState } from "react";
import "./dropdown.css";

const Dropdown = ({ label, options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[1]); // Set the default value to "Something 2"
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <label>{label}</label> {/* Add a label for the dropdown */}
      <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleClick}>
        <span className="selected">{selectedOption}</span>
        <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
      </div>
      <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
        {options.map((option) => (
          <li
            key={option}
            className={option === selectedOption ? "active" : ""}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
