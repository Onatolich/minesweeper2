import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export default function Button({ children, ...props }) {
  return (
    <button {...props} className="Button">
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
