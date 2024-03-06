// TextInput.jsx
import React from 'react';
import "./textInput.css"

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <div className='inputField'>
      <label htmlFor={name}>{label} :</label>
      <input
        className='textInput'
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
