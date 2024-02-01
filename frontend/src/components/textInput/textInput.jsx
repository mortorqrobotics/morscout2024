// TextInput.jsx
import React from 'react';

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
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
