import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

const SelectItem = ({
  name,
  value,
  label,
  error,
  onChange,
  categories,
  message
}) => {
  let selectStyles = 'select';
  return (
    <div className="input__item">
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <select
        className={error ? selectStyles + ' select__error' : selectStyles}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option key="null" value="null">
          {message}
        </option>
        {categories.map(category => {
          return (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          );
        })}
      </select>

      {error && <span className="input__message">{error}</span>}
    </div>
  );
};

SelectItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired
};

SelectItem.defaultProps = {
  value: ''
};

export default SelectItem;
