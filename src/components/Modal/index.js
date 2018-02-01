import React from 'react';
import PropTypes from 'prop-types';
import bembi from 'bembi';
import './Modal.scss';

export default function Modal({ show, children }) {
  return (
    <div className={bembi('Modal', { show })}>
      <div className="Modal__Background" />
      <div className="Modal__Content">
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
};
