import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Form.css';

import ShowImage from './images/show.png';
import HideImage from './images/hide.png';
import OpenImage from './images/open.png';

const InputItem = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  passwordClicked,
  handleToggle
}) => {
  let inputStyles = 'input';
  return (
    <div className="input__item">
      <label className="label" htmlFor={name}>
        {label}
      </label>

      {type === 'password' || passwordClicked ? (
        <div className="input__password">
          <input
            type={type}
            className={error ? inputStyles + ' input__error' : inputStyles}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            // required
          />
          <span
            className="input__password-label"
            onClick={() => handleToggle(name)}
          >
            {passwordClicked ? (
              <img src={HideImage} alt="Hide" />
            ) : (
              <img src={ShowImage} alt="Show" />
            )}
          </span>
        </div>
      ) : type === 'file' ? (
        <Fragment>
          <label className="input input--file-button">
            <span>
              Select Image
              <img src={OpenImage} alt="Open" className="input__icon" />
            </span>
            <input
              type={type}
              className={error ? ' input__error input__file' : ' input__file'}
              name={name}
              value={value}
              onChange={onChange}
              // required
            />
          </label>
        </Fragment>
      ) : (
        <Fragment>
          <input
            type={type}
            className={error ? inputStyles + ' input__error' : inputStyles}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            // required
          />
        </Fragment>
      )}

      {error && <span className="input__message">{error}</span>}
    </div>
  );
};

InputItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputItem.defaultProps = {
  type: 'text',
  placeholder: '',
  value: ''
};

export default InputItem;
