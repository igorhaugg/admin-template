import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ text, type, desc, disabled }) => {
  let buttonStyles = 'button button--';
  return (
    <button
      className={buttonStyles + desc}
      type={type}
      disabled={disabled ? true : false}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'button',
  desc: 'default',
  disabled: false
};

export default Button;
