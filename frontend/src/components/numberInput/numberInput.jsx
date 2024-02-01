// NumberInput.jsx
import React from 'react';

const NumberInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default NumberInput;
