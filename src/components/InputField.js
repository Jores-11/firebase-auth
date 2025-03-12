import React, { useState } from 'react';

const InputField = ({ type, placeholder, handleChange }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleChange(newValue);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      className="auth-input"
    />
  );
};

export default InputField;